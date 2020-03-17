<template>
  <div class="code-editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
// language
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/shell/shell';
// theme
import 'codemirror/theme/dracula.css';
// hint
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/hint/anyword-hint';
// active-line
import 'codemirror/addon/selection/active-line';
// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js';
import 'codemirror/addon/search/searchcursor.js';

import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/brace-fold';

export default {
  name: 'code-editor',

  props: {
    value: {
      type: String,
      default: ''
    },
    lang: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      content: '',
      instance: null,
      defaultOptions: {
        mode: 'text/javascript',
        theme: 'dracula',
        extraKeys: { Ctrl: 'autocomplete' },
        styleActiveLine: true,
        // readOnly: 'nocursor',
        lineNumbers: true,
        smartIndent: true,
        scrollbarStyle: 'overlay'
        // autofocus: true,
        // keymap: 'default'
      }
    };
  },

  watch: {
    value(val) {
      if (val !== this.getValue()) {
        this.setValue(val);
      }
    },
    options: {
      deep: true,
      handler(val) {
        for (let key in options) {
          this.instance.setOptions(key, options[key]);
        }
      }
    }
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      const options = Object.assign({}, this.defaultOptions, this.options);
      if (!this.instance) {
        this.instance = CodeMirror.fromTextArea(this.$refs.textarea, options);
        this.setValue(this.value || this.content);
      }
      this.instance.on('change', cm => {
        this.content = this.getValue();
        this.$emit('input', this.content);
      });
    },
    refresh() {
      this.$nextTick(() => {
        this.instance.refresh();
      });
    },
    destory() {
      const element = this.instance.doc.cm.getWrapperElement();
      element && element.remove && element.remove();
    },
    getValue() {
      if (!this.instance) return null;
      return this.instance.getValue();
    },
    setValue(val) {
      if (!this.instance) return;
      this.instance.setValue(val);
    },
    setOptions(options) {
      if (!options) return;
      for (let key in options) {
        this.instance.setOptions(key, options[key]);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.code-editor {
  text-align: left;
}
</style>
