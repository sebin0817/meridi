<template>
  <div class="container">
    <el-card class="box-card">
      <div class="cardContent">
        <span class="text block" id="name">{{ clinic.name }}</span>
        <span class="text block" id="postal">{{ clinic.postalcode }}</span>
        <span class="text block" id="services">{{ services }}</span>
        <div id="centre">
          <button type="submit">Book</button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ClinicCard",
  props: {
    clinic: {
      type: Object,
    },
  },
  computed: {
    services() {
      let text = "";
      this.clinic.services.forEach((x) => {
        text += x + ", ";
      });
      return text.substring(0, text.length - 2);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
el-card {
	padding: 0px;
}
.container {
  margin-left: 195px;
  background-attachment: fixed;
}
.container2 {
  overflow: scroll;
  height: 200px;
}
.text {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Nunito Sans", sans-serif;
}
#services {
  font-size: 10px;
  margin-top: 5px;
}
.box-card {
  width: 200px;
  margin-bottom: 10px;
}
#name {
  font-weight: bold;
}
button {
  margin: auto;
  margin-top: 5px;
  background-color: #ffcc00;
  border: none;
  color: black;
  padding: 2px;
  border-radius: 4px;
  font-family: "Nunito Sans", sans-serif;
}
button:hover {
  background: #ffc400;
  color: black;
  cursor: pointer;
}
button:focus {
  outline: none;
}
#centre {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
