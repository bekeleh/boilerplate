<template>
  <div class="items-center justify-center">
    <div ref="player" class="m-3" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import ArtPlayer from "artplayer";
import posturl from "../assets/sample/poster.jpg";
// import subtitleUrl from "../assets/sample/subtitle.srt";
import thumbnailsUrl from "../assets/sample/thumbnail.png";
import ploadingUrl from "../assets/img/ploading.gif";
import stateUrl from "../assets/img/state.png";
const videoUrl = "https://artplayer.org/assets/sample/video.mp4";
// const customLayer = "https://via.placeholder.com/100x150.png?text=Custom+Layer";
const customLayer = "";
const options = reactive({
  url: videoUrl,
  title: "This is the video title",
  poster: posturl,
  volume: 0.5,
  isLive: false,
  muted: false,
  autoplay: false,
  pip: true,
  autoSize: true,
  autoMini: true,
  screenshot: true,
  setting: true,
  loop: true,
  flip: true,
  playbackRate: true,
  aspectRatio: true,
  fullscreen: true,
  fullscreenWeb: true,
  subtitleOffset: true,
  miniProgressBar: true,
  mutex: true,
  backdrop: true,
  playsInline: true,
  autoPlayback: true,
  theme: "#23ade5",
  lang: navigator.language.toLowerCase(),
  whitelist: ["*"],
  moreVideoAttr: {
    crossOrigin: "anonymous",
  },
  contextmenu: [
    {
      html: "Context menu 1",
      click: function (contextmenu) {
        console.info("You clicked on the Context menu 1");
        contextmenu.show = true;
      },
    },
    {
      html: "Context menu 2",
      click: function (contextmenu) {
        console.info("You clicked on the Context menu 2");
        contextmenu.show = true;
      },
    },
  ],
  layers: [
    {
      html: `<img src="${customLayer}" style="width:100px;">`,
      click: function () {
        console.info("You clicked on the custom layer");
      },
      style: {
        position: "absolute",
        top: "20px",
        right: "20px",
        opacity: ".9",
      },
    },
  ],
  quality: [
    {
      default: true,
      name: "SD 480P",
      url: videoUrl,
      html: "SD quality",
    },
    {
      name: "HD 720P",
      url: videoUrl,
      html: "HD quality",
    },
  ],
  thumbnails: {
    url: thumbnailsUrl,
    number: 100,
    width: 300,
    height: 90,
    column: 10,
  },
  subtitle: {
    url: "",
    style: {
      color: "#03A9F4",
    },
    encoding: "utf-8",
    bilingual: true,
  },
  highlight: [
    {
      time: 10,
      text: "Chapter 1, Intro",
    },
    {
      time: 20,
      text: "Chapter 2, Characters",
    },
    {
      time: 30,
      text: "Chapter 3, Objects",
    },
    {
      time: 40,
      text: "Chapter 4, View",
    },
    {
      time: 60,
      text: "Chapter 4, Finish",
    },
  ],
  controls: [
    {
      position: "left",
      html: "Menu 1",
      click: function () {
        console.info("You clicked on the menu 1");
      },
    },
    {
      position: "right",
      html: "Menu 2",
      click: function () {
        console.info("You clicked on the menu 2");
      },
    },
  ],
  icons: {
    loading: `<img src="${ploadingUrl}">`,
    state: `<img src="${stateUrl}">`,
  },
});
const player = ref("");
onMounted(() => {
  nextTick(() => {
    new ArtPlayer({
      ...options,
      container: player.value,
    });
  });
});
defineExpose({
  player,
  options,
});
</script>

<style lang="scss" scoped></style>
