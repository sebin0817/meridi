<template>
  <section class="hero">
    <div class="hero-text container">
      <section id="TCM">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card
              @mouseover="hv1 = true"
              @mouseleave="hv1 = false"
              shadow="hover"
              id="accupuncture"
              class="box-card"
            >
              <div class="text item">
                <p v-show="hv1">
                  <b> Acupuncture </b> is a drug-free treatment whereby fine,
                  sterile needles are inserted into the acupuncture points. It
                  can release blocked meridian channels in the body, evoking the
                  body’s natural healing response through various physiological
                  systems.
                </p>
              </div>
            </el-card></el-col
          >
          <el-col :span="8">
            <el-card
              @mouseover="hv2 = true"
              @mouseleave="hv2 = false"
              shadow="hover"
              id="tuina"
              class="box-card"
            >
              <div class="text item">
                <p v-show="hv2">
                  <b> Tuina </b> involves applying pressure on acupoints,
                  meridians and various muscle groups to regulate the body’s
                  physiological and pathological condition, thus achieving
                  positive treatment results.
                </p>
              </div>
            </el-card></el-col
          >
          <el-col :span="8">
            <el-card
              @mouseover="hv3 = true"
              @mouseleave="hv3 = false"
              shadow="hover"
              id="herbal"
              class="box-card"
            >
              <div class="text item">
                <p v-show="hv3">
                  <b> Herbal medication </b> are customized prescriptions by
                  Physicians based on the dosage and herbs required for the
                  individual. Unlike in the past, herbal medication now comes in
                  convenient sachets of herbal powder for easy consumption.
                </p>
              </div>
            </el-card></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card
              @mouseover="hv4 = true"
              @mouseleave="hv4 = false"
              shadow="hover"
              id="guasha"
              class="box-card"
            >
              <div class="text item">
                <p v-show="hv4">
                  <b>Gua Sha</b> helps to relieve blockage in the meridians
                  channels to enhance blood circulation and encourage
                  detoxification. Skin is lightly scraped on the surface using a
                  Gua Sha tool which causes minor bruising that typically goes
                  away within a few days.
                </p>
              </div>
            </el-card></el-col
          >
          <el-col :span="8">
            <el-card
              @mouseover="hv5 = true"
              @mouseleave="hv5 = false"
              shadow="hover"
              id="cupping"
              class="box-card"
            >
              <div class="text item">
                <p v-show="hv5">
                  <b>Cupping</b> breaks up stagnation and promotes better Qi
                  flow to achieve pain relief and reduce swelling, disperse
                  cold, clear dampness, reduce heatiness and so on. It is
                  achieved by placing glass cups over small flame to create a
                  vacuum, thus resulting in suction.
                </p>
              </div>
            </el-card></el-col
          >
          <el-col :span="8">
            <el-card
              @mouseover="hv6 = true"
              @mouseleave="hv6 = false"
              shadow="hover"
              id="device"
              class="box-card"
            >
              <div class="text item">
                <p v-show="hv6">
                  <b>Device Therapy</b> complements traditional TCM therapies to
                  yield better treatment results for patients. MINATO devices
                  originating from Japan pass different frequencies through the
                  body to enhance drainage of metabolic waste and reduce
                  recovery time.
                </p>
              </div>
            </el-card></el-col
          >
        </el-row>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      hv1: false,
      hv2: false,
      hv3: false,
      hv4: false,
      hv5: false,
      hv6: false,
    };
  },
};
</script>

<style scoped>
#accupuncture {
  background-image: url("../../assets/TCM/accupuncture.png");
}
#accupuncture:hover {
  background-image: url("../../assets/TCM/accupuncture1.png");
}
#tuina {
  background-image: url("../../assets/TCM/tunia.png");
}
#tuina:hover {
  background-image: url("../../assets/TCM/tunia1.png");
}
#herbal {
  background-image: url("../../assets/TCM/herbal.png");
}
#herbal {
  background-image: url("../../assets/TCM/herbal.png");
}
#herbal:hover {
  background-image: url("../../assets/TCM/herbal1.png");
}
#guasha {
  background-image: url("../../assets/TCM/guasha.png");
}
#guasha:hover {
  background-image: url("../../assets/TCM/guasha1.png");
}
#cupping {
  background-image: url("../../assets/TCM/cupping.png");
}
#cupping:hover {
  background-image: url("../../assets/TCM/cupping1.png");
}
#device {
  background-image: url("../../assets/TCM/device.png");
}
#device:hover {
  background-image: url("../../assets/TCM/device1.png");
}
.hero {
  background-attachment: fixed;
  position: relative;
  height: 100vh;
}
.hero-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  line-height: 1.6;
}
#TCM {
  position: absolute;
  top: 300px;
  left: 0px;
  right: 0px;
}
.el-row {
  margin-bottom: 20px;
}

p,
b {
  font-size: 14px;
  font-family: "Georgia", Times, serif;
}

.item {
  padding: 10px;
  height: 160px;
}
b {
  font-weight: bold;
}
</style>
