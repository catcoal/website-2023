<script setup lang="ts">
import "highlight.js/styles/base16/atelier-estuary.css"
import hljs from "highlight.js"
import { OptimizeImageURL } from "~/utils/utils"
import MarkdownIt from "markdown-it";

const props = defineProps<{ richText: string }>();
const content = ref('');

onMounted(() => {
  const renderer = new MarkdownIt({
    linkify: true,
    typographer: true,
    highlight: function (str: any, lang: any) {
      if (!lang) {
        return ''
      }
      if (hljs.getLanguage(lang)) {
        try {
          return '<pre><code class="hljs">' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>';
        } catch (__) { }
      }
      if (lang.toLowerCase() === 'mermaid') {
        return '<pre class="mermaid">' + str + '</pre>'
      }

      return '';
    }
  });
  // 拦截图片重新设置
  renderer.renderer.rules.image = (tokens, idx, options, env, self) => {
    const originalURL = tokens[idx].attrs?.find(attr => attr[0] === 'src')?.[1] || '';
    const newUrl = OptimizeImageURL(originalURL, 80);
    return `<img src="${newUrl}" alt="" />`;
  };
  // 渲染文章
  content.value = renderer.render(props.richText);
})

</script>

<template>
  <div id="post-content" class="post-content markdown-body" v-html="content"></div>
</template>

<style>
@import url("~/assets/style/github-md.css");

/* #post-content * {
  margin: revert;
  padding: revert;
  list-style: revert;
  color: revert;
  font-size: revert;
  word-break: break-word;
} */

#post-content img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius);
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  z-index: 2;
  border: 1px solid rgb(207, 217, 222);
}
</style>