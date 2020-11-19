<template>
  <div class="addSong">
    <v-container>
      <h1>Add a song</h1>
      <v-form ref="form">
        <v-text-field
          outlined
          required
          prepend-icon="mdi-music-box"
          v-model="music.title"
          label="Title"
        ></v-text-field>
        <v-text-field
          outlined
          required
          prepend-icon="mdi-account-music"
          v-model="music.artist"
          label="Artist"
        ></v-text-field>
        <v-textarea
          outlined
          prepend-icon="mdi-comment"
          v-model="music.description"
          label="Description"
        ></v-textarea>
        <v-file-input
          outlined
          required
          prepend-icon="mdi-file-image"
          accept="image/png, image/jpeg, image/bmp"
          v-model="file.image"
          label="Thumbnail"
        ></v-file-input>
        <v-file-input
          outlined
          required
          prepend-icon="mdi-file-music"
          accept="audio/mp3"
          v-model="file.audio"
          label="Music"
        ></v-file-input>
        <v-btn class="mr-4" @click="submit"> Save song </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddSong",
  data() {
    return {
      music: {
        title: "",
        artist: "",
        description: "",
        thumbnail: "",
        url: "",
      },
      file: {
        image: undefined,
        audio: undefined,
      },
      message: "",
      fileInfos: [],
    };
  },
  methods: {
    upload(file) {
      let formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://localhost:8000/api.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (data) {
          console.log(data.data);
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    submit() {
      if (!(this.file.image && this.file.audio)) {
        return;
      }
      const localThis = this;

      this.upload(this.file.audio);
      this.upload(this.file.image);

      this.music.thumbnail = "upload" + this.file.image.name;
      this.music.url = "upload" + this.file.audio.name;

      setTimeout(function () {
        // this.$refs.form.submit();
        const playlist = JSON.parse(localStorage.getItem("playlist")).musics
          ? JSON.parse(localStorage.getItem("playlist")).musics
          : [];
        playlist.push(localThis.music);
        const newPlaylist = {
          musics: playlist,
        };
        localStorage.setItem("playlist", JSON.stringify(newPlaylist));
        localThis.$router.push("/");
      }, 500);
    },
  },
};
</script>