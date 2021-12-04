<template>
  <div id="app">
    <textarea
      class="editor"
      ref="editor"
      :value="input"
      @input="update"
      @paste="paste"
      @keydown.9.exact.prevent="tab($event, true)"
      @keydown.shift.exact.9.prevent="tab($event, false)"
      placeholder="# hello world"
    />

    <div class="vs-button" :class="{ disable }" @click="handleClick">保存</div>
    <div v-if="showProgress" class="progress">图片上传中...</div>
  </div>
</template>

<script>
if (window.acquireVsCodeApi) {
  window.vscode = window.acquireVsCodeApi()
}
async function uploadImg (data) {
  window.vscode.postMessage({
    type: 'blog-upload',
    data
  })
}

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      input: '',
      editor: null,
      item: null,
      disable: false,
      showProgress: false,
      uploadProgress: 0
    }
  },
  created () {
    const previousState = window.vscode.getState()
    if (previousState) {
      this.setData(previousState)
    }

    window.addEventListener('message', e => {
      if (e.data.type === 'blog') {
        this.setData(e.data.data)
        window.vscode.setState(this.item)
      } else if (e.data.type === 'blog-upload') {
        const uploadRes = e.data.data
        this.uploadProgress = 0
        this.showProgress = false
        const str = `![${uploadRes.data.sha}](${uploadRes.data.download_url})`
        this.insertEditorString(str, str.length)
      }
    })
  },
  mounted () {
    this.editor = this.$refs.editor
  },
  methods: {
    setData (data) {
      this.item = data
      this.input = `# ${this.item.title} \n\n\n${this.item.input.replace(/^\n+/, '')}`
    },

    getData () {
      const i = this.input.indexOf('\n')
      const title = this.input.substr(0, i).replace(/#/g, '').trim()
      const input = this.input.substr(i)
      return {
        title,
        input: input.replace(/^\n+/, ''),
        id: this.item.id
      }
    },

    handleClick () {
      if (this.disable) {
        return
      }
      this.disable = true
      window.vscode.postMessage({
        type: 'blog',
        data: this.getData()
      })
    },

    update (e) {
      this.disable = false
      this.input = e.target.value
      window.vscode.setState(this.getData())
    },
    tab (e, isAdd) {
      let indent = ''
      let result = ''
      const selectedString = window.getSelection().toString()

      if (isAdd) {
        indent = '  '
        // 每行增加对应的indent
        result = indent + selectedString.replace(/\n/g, '\n' + indent)
      } else {
        // 缩进
        // 替换行首2个tab
        result = selectedString.replace(/^\s{2}/, '')
        // 替换剩余换行前的tab
        result = result.replace(/\n\s{2}/g, '\n')
      }
      this.insertEditorString(result, result.length, !!selectedString)
    },

    // 插入编辑器
    // @params insertString {String}
    // @params focusPosBaseStart {Number} 相对于start的长度
    // @params hasSelection {Boolean} 是否选中了文字
    // @returns
    insertEditorString (
      insertString,
      focusPosBaseStart = 0,
      hasSelection = false
    ) {
      const { selectionStart, selectionEnd } = this.editor
      const startString = this.input.substring(0, selectionStart)
      const endString = this.input.substring(selectionEnd)

      this.input = startString + insertString + endString
      this.$nextTick(() => {
        const startPos = hasSelection ? selectionStart : selectionStart + focusPosBaseStart
        const endPos = selectionStart + focusPosBaseStart
        this.editor.focus()
        this.editor.setSelectionRange(startPos, endPos)
      })
    },

    paste (e) {
      const pasteItem = e.clipboardData.items[0]
      if (pasteItem && /image/.test(pasteItem.type)) {
        e.preventDefault()
        const blob = pasteItem.getAsFile()
        const rdr = new FileReader()
        rdr.onloadend = () => {
          this.upload(this.title, rdr.result)
        }
        rdr.readAsDataURL(blob)
      } else {
        pasteItem.getAsString(content => {
          console.log(content)
          this.$message.info('复制的是字符串')
        })
      }
    },

    async upload (title, base64) {
      this.showProgress = true
      this.uploadProgress = 50
      await uploadImg({
        commit: title,
        // base64: base64.split(';')[1]
        base64: base64.split(',')[1]
        // cb: (num) => {
        //   this.showProgress = true
        //   this.uploadProgress = num
        // }
      })
      // let name = title || 'jmingzi'
      // uploadImg({
      //   name,
      //   base64: base64.split(';')[1],
      //   cb: (num) => {
      //     this.showProgress = true
      //     this.uploadProgress = num
      //   }
      // }).then(res => {
      //   this.uploadProgress = 0
      //   this.showProgress = false
      //   const str = `![${res.id}](${res.attributes.url})`
      //   this.insertEditorString(str, str.length)
      // })
    }
  }
}
</script>

<style lang="less">
.editor {
  font-family: AppleSystemUIFont;
  border: none;
  background-color: #1e1e1e;
  color: #fff;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 15px;
  font-size: 14px;
  &:focus {
    outline: none;
  }
}
.vs-button {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgb(0, 122, 204);
  color: #fff;
  font-size: 13px;
  padding: 5px 20px;
  cursor: pointer;
  //border-radius: 2px;
  &.disable {
    background-color: rgba(0, 122, 204, .5);
  }
}
.progress {
  position: fixed;
  top: 17px;
  right: 90px;
  color: #fff;
  font-size: 12px;
}
</style>
