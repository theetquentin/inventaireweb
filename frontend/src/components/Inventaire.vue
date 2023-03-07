<template>
  <div class="container px-4 py5 text-start">
    <h1 class="pb-2 border-bottom text-center titre-animation">Configuration PC {{ ordinateur.idPc }}</h1>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-2">
      <div class="col d-flex align-items-start">
        <div
          class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <i class="bi bi-hdd-stack-fill specs text-white"></i>
        </div>
        <div>
          <h3 class="fs-2">Stockage</h3>
          <p>C'est l'endroit où les données et les programmes sont stockés de manière permanente sur l'ordinateur.</p>
          <div class="flex-chart">
            <p class="specs lead">
              Disque C : {{ ordinateur.used_c + " / " + ordinateur.storage_c }} Go
            </p>
            <p class="specs lead">
              Disque D : {{ ordinateur.used_d + " / " +ordinateur.storage_d }} Go
            </p>
          </div>
          <div class="pie-legend">
            <ul>
              <li>
                <span style="background-color:#0B6487"></span>
                Espace disque restant
              </li>
              <li>
                <span style="background-color:#9D1F37"></span>
                Espace disque utilisé
              </li>
            </ul>
        </div>
          <div class="flex-chart">
            <Camembert :camembertData="camembertDataC" />
            <Camembert :camembertData="camembertDataD" />
        </div>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div
          class="icon-square  text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <i class="bi bi-memory text-white specs"></i>
        </div>
        <div>
          <h3 class="fs-2">Mémoire ram</h3>
          <p>C'est un type de mémoire utilisé pour stocker les données temporaires nécessaires à l'exécution des
            programmes.</p>
            <p class="specs lead">
            {{ ordinateur.ram }} Go
          </p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div
          class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <i class="bi bi-pc-display specs text-white"></i>
        </div>
        <div>
          <h3 class="fs-2">Système d'exploitation</h3>
          <p>Un système d'exploitation (OS) est un logiciel qui gère les ressources de l'ordinateur et fournit une interface pour les utilisateurs et les applications.</p>
          <p class="specs lead">
            {{ ordinateur.os }}
          </p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div
          class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <i class="bi bi-cpu specs text-white"></i>
        </div>
        <div>
          <h3 class="fs-2">Processeur</h3>
          <p>C'est le cerveau de l'ordinateur, responsable du traitement des données et des instructions.</p>
          <p class="specs lead">
            {{ ordinateur.cpu }}
          </p>
        </div>
      </div>
    </div>
    <!-- <p> {{ diskUsageC }}</p>
    <p> {{ diskUsageD }}</p> -->
  </div>
</template>

<script>
import Camembert from './Camembert.vue'

export default {
  name: 'Inventaire',
  data () {
    return {
      ordinateur: [],
      camembertDataC: [],
      camembertDataD: [],
      diskUsageC: 0,
      diskUsageD: 0,
      diskAvailableC: 0,
      diskAvailableD: 0
    }
  },
  methods: {
    getOrdi () {
      let url = 'http://localhost:3000/inventaire'
      this.$http.get(url).then(response => {
        console.log(response.body)
        this.ordinateur = response.body
        this.diskUsageC = ((this.ordinateur.used_c / this.ordinateur.storage_c) * 100).toFixed(0)
        this.diskUsageD = ((this.ordinateur.used_d / this.ordinateur.storage_d) * 100).toFixed(0)
        this.diskAvailableC = 100 - this.diskUsageC
        this.diskAvailableD = 100 - this.diskUsageD
        this.camembertDataC = [
          { label: 'Espace disque C restant', color: '#0B6487', value: this.diskAvailableC },
          { label: 'Espace disque C utilisé', color: '#9D1F37', value: this.diskUsageC }
        ]
        this.camembertDataD = [
          { label: 'Espace disque D restant', color: '#0B6487', value: this.diskAvailableD },
          { label: 'Espace disque D utilisé', color: '#9D1F37', value: this.diskUsageD }
        ]
      }, reponse => {
        // error callback
      }
      )
    }
  },
  mounted () {
    this.getOrdi()
    // this.diskUsageC = (this.ordinateur.storage_c / this.ordinateur.used_c) * 100
    // this.diskUsageD = (this.ordinateur.storage_c / this.ordinateur.used_c) * 100
  },
  components: { Camembert }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-square {
  width: 3rem;
  height: 3rem;
  border-radius: .75rem;
}
.specs {
  color: white;
  background-image: linear-gradient(90deg, rgba(249,185,255,1), rgba(177,172,255,1), rgba(98,203,255,1));
  /* background-image: linear-gradient(90deg, #845ec2, #2c73d2, #0081cf, #0089ba, #008e9b, #008f7a); */
  background-size: 300%;
  animation: bg-animation 5s infinite alternate;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes bg-animation {
  0% {
    background-position: left;
  }
  100% {
    background-position: right;
  }
}

.flex-chart {
    display:flex;
    justify-content:space-around;
}

.pie-legend {
  display:flex;
  justify-content: center;
}

.pie-legend ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.pie-legend li {
  font-size: 16px;
}

.pie-legend span {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 5px;
}

</style>
