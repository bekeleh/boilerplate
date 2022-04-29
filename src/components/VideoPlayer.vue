<template>
  <div ref="player" class="m-3" style="width: 600px; height: 400px"></div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import ArtPlayer from "artplayer";
import videoUrl from "../assets/sample/video.mp4";
import posturl from "../assets/sample/poster.jpg";
// import subtitleUrl from "../assets/sample/subtitle.srt";
import thumbnailsUrl from "../assets/sample/thumbnail.png";
import ploadingUrl from "../assets/img/ploading.gif";
import stateUrl from "../assets/img/state.png";

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
  rotate: true,
  playbackRate: true,
  aspectRatio: true,
  fullscreen: true,
  fullscreenWeb: true,
  subtitleOffset: true,
  miniProgressBar: true,
  localVideo: true,
  localSubtitle: true,
  networkMonitor: false,
  mutex: true,
  light: true,
  backdrop: true,
  info: true,
  theme: "#ffad00",
  lang: navigator.language.toLocaleLowerCase(),
  moreVideoAttr: {
    crossOrigin: "anonymous",
  },
  contextmenu: [
    {
      html: "Context menu 1",
      click: function (contextmenu) {
        console.info("You clicked on the Context menu 1");
        // contextmenu.show = false,
      },
    },
    {
      html: "Context menu 2",
      click: function (contextmenu) {
        console.info("You clicked on the Context menu 2");
        // contextmenu.show = false,
      },
    },
  ],
  layers: [
    {
      //   html: '<img src="https://via.placeholder.com/100x150.png?text=Custom+Layer" style="width:100px;">',
      html: "",
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
    width: 160,
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
      time: 60,
      text: "Chapter 1, Intro",
    },
    {
      time: 120,
      text: "Chapter 2, Characters",
    },
    {
      time: 180,
      text: "Chapter 3, Objects",
    },
    {
      time: 240,
      text: "Chapter 4, View",
    },
    {
      time: 300,
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
    loading: '<img src="/src/assets/img/ploading.gif">',
    state: '<img src="/src/assets/img/state.png">',
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
