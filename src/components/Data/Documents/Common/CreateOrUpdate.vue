<template>
  <div>
    <div class="card-panel">
      <div class="row">
        <div class="switch">
          <label>
            Form
            <input type="checkbox" @click="switchEditMode" />
            <span class="lever"></span>
            Json
          </label>
        </div>
      </div>

      <form class="wrapper" @submit.prevent="create">

        <!-- Form view -->
        <div class="row" v-if="viewState === 'form'">
          <div class="row" v-if="!hideId">
            <div class="col s6">
              <div class="input-field">
                <input id="id" type="text" name="collection" @input="updateId" :value="newDocument._id" v-focus :required="mandatoryId" />
                <label for="id">Document identifier {{!mandatoryId ? '(optional)' : ''}}</label>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="divider"></div>
          </div>

          <div class="row">
            <div class="col s7">
              <div class="row">
                <a class="btn btn-small" @click="addRootAttr">
                  <i class="fa fa-plus-circle left"></i>
                  new attribute
                </a>
              </div>

              <div class="list-fields">
                <div v-for="(name, content) in mapping">
                  <json-form
                    :name="name"
                    :content="content"
                    @document-create::change-type-attribute="changeTypeAttribute">
                  </json-form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Json view -->
        <div class="row" v-if="viewState === 'code'">
          <json-editor class="pre_ace" :content="newDocument" v-ref:jsoneditor></json-editor>
        </div>

        <div class="row">
          <div class="col s6">
            <a @click.prevent="cancel" class="btn-flat waves-effect">
              Cancel
            </a>
            <button type="submit" class="btn primary waves-effect waves-light">
              <i v-if="!hideId" class="fa fa-plus-circle left"></i>
              <i v-else class="fa fa-pencil left"></i>
              {{hideId ? 'Update' : 'Create'}}
            </button>
          </div>
        </div>

      </form>
    </div>

    <modal id="add-attr" :has-footer="false">
      <h4>Add a new attribute</h4>
      <form method="post" @submit.prevent="doAddAttr">
        <p>
          <div class="input-field">
            <input id="name" type="text" required v-model="newAttributeName" v-focus/>
            <label for="name">Field name</label>
          </div>
          <div class="input-field">
            <select v-m-select="newAttributeType">
              <option value="string" selected>String</option>
              <option value="integer">Integer</option>
              <option value="float">Float</option>
              <option value="nested">Nested</option>
              <option value="object">Object</option>
              <option value="geo_point">Geo point</option>
            </select>
            <label>Attribute type</label>
          </div>
        </p>

        <div class="modal-footer">
          <button
            type="submit"
            class="waves-effect waves-green btn">
              Add
          </button>
          <a class="btn-flat" @click.prevent="$broadcast('modal-close', 'add-attr')">
              Cancel
          </a>
        </div>
      </form>
    </modal>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss">
  .pre_ace, .ace_editor {
    height: 350px;
  }
</style>

<script>
  import kuzzle from '../../../../services/kuzzle'
  import JsonForm from '../../../Common/JsonForm/JsonForm'
  import {setNewDocument, unsetNewDocument, setPartial} from '../../../../vuex/modules/data/actions'
  import {newDocument} from '../../../../vuex/modules/data/getters'
  import JsonEditor from '../../../Common/JsonEditor'
  import Modal from '../../../Materialize/Modal'
  import MSelect from '../../../../directives/Materialize/m-select.directive'
  import {getRefMappingFromPath, getUpdatedSchema} from '../../../../services/documentFormat'
  import {mergeDeep, formatType} from '../../../../services/objectHelper'
  import Focus from '../../../../directives/focus.directive'
  import Promise from 'bluebird'
  import Vue from 'vue'

  let promiseGetMappingResolve
  let promiseGetMappingReject
  let promiseGetMapping = new Promise((resolve, reject) => {
    promiseGetMappingResolve = resolve
    promiseGetMappingReject = reject
  })

  export default {
    name: 'DocumentCreateOrUpdate',
    components: {
      JsonForm,
      JsonEditor,
      Modal
    },
    props: {
      index: String,
      collection: String,
      hideId: Boolean,
      mandatoryId: {
        default: false,
        type: Boolean
      }
    },
    directives: {
      MSelect,
      Focus
    },
    methods: {
      create () {
        let json

        if (this.viewState === 'code') {
          json = this.$refs.jsoneditor.getJson()
        }

        this.$dispatch('document-create::create', this.viewState, json, this.mapping)
      },
      switchEditMode () {
        if (this.viewState === 'code') {
          let json = this.$refs.jsoneditor.getJson()
          if (json) {
            mergeDeep(this.mapping, getUpdatedSchema(json, this.collection).properties)
            // update document id
            if (json._id) {
              this.setPartial('_id', json._id)
            }
          }
          this.viewState = 'form'
          return
        }
        this.viewState = 'code'
      },
      addRootAttr () {
        this.newAttributePath = ''
        this.$broadcast('modal-open', 'add-attr')
      },
      doAddAttr () {
        let refMapping = getRefMappingFromPath(this.mapping, this.newAttributePath)
        Vue.set(
          refMapping,
          this.newAttributeName,
          (this.newAttributeType === 'nested' || this.newAttributeType === 'object'
              ? {type: this.newAttributeType, properties: {}}
              : {type: this.newAttributeType}
          ))

        this.newAttributeType = 'string'
        this.newAttributeName = null
        this.newAttributePath = null
        this.$broadcast('modal-close', 'add-attr')
      },
      updateId (e) {
        this.setPartial('_id', e.target.value)
      },
      cancel () {
        this.$dispatch('document-create::cancel')
      },
      changeTypeAttribute (attributePath, name, type, val) {
        getRefMappingFromPath(this.mapping, attributePath)
        Vue.set(this.mapping, name, {type, val})
      }
    },
    vuex: {
      actions: {
        setNewDocument,
        unsetNewDocument,
        setPartial
      },
      getters: {
        newDocument
      }
    },
    beforeDestroy () {
      this.unsetNewDocument()
    },
    data () {
      return {
        mapping: {},
        viewState: 'form',
        newAttributeType: 'string',
        newAttributePath: null,
        newAttributeName: null
      }
    },
    ready () {
      kuzzle
        .dataCollectionFactory(this.collection, this.index)
        .getMappingPromise()
        .then((res) => {
          this.mapping = res.mapping
          formatType(this.mapping, this.collection)
          promiseGetMappingResolve()
        })
        .catch(() => {
          // todo errors
          promiseGetMappingReject()
        })
    },
    events: {
      'document-create::add-attribute' (path) {
        this.newAttributePath = path
        this.$broadcast('modal-open', 'add-attr')
      },
      'document-create::fill' (document) {
        promiseGetMapping
          .then(() => {
            this.mapping = mergeDeep(this.mapping, getUpdatedSchema(document, this.collection).properties)
          })
      }
    }
  }
</script>