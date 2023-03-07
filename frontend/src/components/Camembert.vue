<template>
  <div>
    <div class="pie-chart" :style="pieStyle">
    </div>
  </div>
</template>

<script>
export default {
  props: ['camembertData'],
  /*
        props qui génère dynamiquement le style du background
      */
  computed: {
    // texteCamembert: part.label + ' ' + part.value,
    pieStyle () {
      /*
            Contient la somme des dernières valeurs
          */
      let sum = 0
      /*
            La fonction map créé de nouvelles clés, avec des valeurs

            retourne un objet avec un dégradé conic
            La méthode join va concaténer et retourner une nouvelle chaine
            de tous les éléments dans le tableau, séparé par des virgules
            ou un séparateur spécifique (à changer)
            S'il n'y a qu'un item dans le tableau, on retourne cet item sans
            séparateur.

          */
      return {
        background:
          'conic-gradient(' +
          this.camembertData
            .map(piePart => `${piePart.color} 0 ${(sum += piePart.value)}%`)
            .join(',') +
          ')'
      }
    }
  }
}
</script>

<style scoped>
.pie-chart {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #fefefe;
  animation: show 1s ease-in-out;
}

.pie-text {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
/*
      L'animation du camembert
    */
@keyframes show {
  0% {
    transform: scale(0) rotate(720deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

</style>
