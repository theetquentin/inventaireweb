<template>
  <div class="container px-4 py5 text-start">
    <h1 class="pb-2 border-bottom text-center titre-animation">Configuration PC</h1>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-2 row-cols-xl-4">
      <div class="col d-flex align-items-start">
        <div
          class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <i class="bi bi-hdd-stack-fill specs text-white"></i>
        </div>
        <div>
          <h3 class="fs-2">Stockage</h3>
          <p>C'est l'endroit où les données et les programmes sont stockés de manière permanente sur l'ordinateur.</p>
          <p class="specs lead">
            {{ ordinateur.stockage }}
          </p>
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
            {{ ordinateur.memoire }}
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
            {{ ordinateur.gpu }}
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
  </div>
</template>

<script>

export default {
  name: 'Inventaire',
  data () {
    return {
      ordinateur: []
    }
  },
  methods: {
    getOrdi () {
      let url = 'http://localhost:3000/inventaire'
      this.$http.get(url).then(response => {
        console.log(response.body)
        this.ordinateur = response.body
      }, reponse => {
        // error callback
      }
      )
    }
  },
  mounted () {
    this.getOrdi(1)
  }
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

</style>
