<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 - Informations générales du compte courant -->
  <div class="row">
    <!-- Solde du compte courant -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card custom-card info-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-wallet"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Solde Actuel</p>
            <h4 class="fw-semibold mb-1">{{ formatCurrency(currentBalance) }}</h4>
            <a href="javascript:void(0);" class="text-primary">Voir détails</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Limite de découvert autorisé -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card custom-card info-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-cash-stack"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Découvert Autorisé</p>
            <h4 class="fw-semibold mb-1">{{ formatCurrency(overdraftLimit) }}</h4>
            <a href="javascript:void(0);" class="text-primary">Modifier limite</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Solde disponible avec découvert -->
    <div class="col-lg-4 col-md-12 mb-4">
      <div class="card custom-card info-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-graph-up-arrow"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Solde Disponible</p>
            <h4 class="fw-semibold mb-1">{{ formatCurrency(availableBalance) }}</h4>
            <a href="javascript:void(0);" class="text-primary">Voir plus</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--End::row-1 -->

  <!-- Start::row-2 - Historique des Transactions -->
  <div class="row">
    <!-- Historique des Transactions -->
    <div class="col-lg-8 col-md-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Historique des Transactions
          </div>
        </div>
        <div class="card-body p-0 table-responsive">
          <table class="table text-nowrap table-hover mb-0 ">
            <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Montant</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.description }}</td>
              <td :class="transaction.amount > 0 ? 'text-success' : 'text-danger'">
                {{ formatCurrency(transaction.amount) }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Graphique des Dépenses -->
    <div class="col-lg-4 col-md-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Graphique des Dépenses
          </div>
        </div>
        <div class="card-body">
          <apexchart type="line" :options="chartOptions" :series="chartSeries"></apexchart>
        </div>
      </div>
    </div>
  </div>
  <!--End::row-2 -->
</template>

<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import auth from '@/middleware/auth';
import { ref } from 'vue';
import ApexCharts from 'vue3-apexcharts';

export default {
  setup() {
    definePageMeta({
      middleware: [auth],
    });

    // Fonction pour formater les montants en DH
    const formatCurrency = (value: number) => {
      return value + ' DH';
    };

    // Données du compte courant
    const currentBalance = ref(8000); // Solde actuel
    const overdraftLimit = ref(2000); // Limite de découvert autorisé
    const availableBalance = ref(currentBalance.value + overdraftLimit.value); // Solde disponible

    // Historique des transactions
    const transactions = ref([
      { id: 1, date: '01/10/2024', description: 'Paiement Restaurant', amount: -300 },
      { id: 2, date: '30/09/2024', description: 'Virement Salaire', amount: 15000 },
      { id: 3, date: '29/09/2024', description: 'Paiement Facture Électricité', amount: -200 },
      { id: 4, date: '28/09/2024', description: 'Retrait DAB', amount: -1000 },
      { id: 5, date: '27/09/2024', description: 'Achat Supermarché', amount: -450 }
    ]);

    // Données pour le graphique des dépenses
    const chartSeries = ref([
      {
        name: "Dépenses",
        data: [400, 300, 700, 500, 800, 900, 600]
      }
    ]);
    const chartOptions = ref({
      chart: {
        height: 350,
        type: 'line'
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true
      }
    });

    const dataToPass = {
      current: "Compte courant",
      list: ['Comptes', 'Compte courant']
    };

    return {
      dataToPass,
      currentBalance,
      overdraftLimit,
      availableBalance,
      transactions,
      chartSeries,
      chartOptions,
      formatCurrency
    };
  },
  components: {
    PageHeader,
    ApexCharts
  },
};
</script>

<style scoped>
/* Styles communs pour les cartes d'information */
.info-card {
  border-radius: 12px;
  padding: 10px;
}

.card-body {
  padding: 20px;
}

.icon-container {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: #f8f9fa;
  border-radius: 50%;
}

.shadow-lg {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-primary {
  color: #007bff !important;
}

/* Styles supplémentaires */
.table th, .table td {
  padding: 10px;
  font-size: 0.9rem;
}
</style>
