<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 - Informations générales sur les prêts -->
  <div class="row">
    <!-- Montant Total du Prêt -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card custom-card loan-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-currency-exchange"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Montant Total du Prêt</p>
            <h4 class="fw-semibold mb-1">{{ formatCurrency(totalLoan) }}</h4>
            <a href="javascript:void(0);" class="text-primary">Voir détails</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Solde Restant Dû -->
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card custom-card loan-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-bank"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Solde Restant Dû</p>
            <h4 class="fw-semibold mb-1">{{ formatCurrency(remainingBalance) }}</h4>
            <a href="javascript:void(0);" class="text-primary">Voir échéancier</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Taux d'Intérêt -->
    <div class="col-lg-4 col-md-12 mb-4">
      <div class="card custom-card loan-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-percent"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Taux d'Intérêt</p>
            <h4 class="fw-semibold mb-1">{{ interestRate }}%</h4>
            <a href="javascript:void(0);" class="text-primary">Voir détails</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--End::row-1 -->

  <!-- Start::row-2 - Détails des paiements et Graphique -->
  <div class="row">
    <!-- Détails des Paiements -->
    <div class="col-lg-8 col-md-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Détails des Paiements
          </div>
        </div>
        <div class="card-body p-0">
          <table class="table text-nowrap table-hover mb-0">
            <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Montant</th>
              <th>Statut</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="payment in paymentDetails" :key="payment.id">
              <td>{{ payment.date }}</td>
              <td>{{ payment.description }}</td>
              <td>{{ formatCurrency(payment.amount) }}</td>
              <td :class="payment.status === 'Payé' ? 'text-success' : 'text-danger'">
                {{ payment.status }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Graphique des Paiements Restants -->
    <div class="col-lg-4 col-md-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Paiements Restants
          </div>
        </div>
        <div class="card-body">
          <apexchart type="donut" :options="remainingPaymentsOptions" :series="remainingPaymentsSeries"></apexchart>
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

    // Informations sur les prêts
    const totalLoan = ref(200000); // Montant total emprunté
    const remainingBalance = ref(150000); // Solde restant dû
    const interestRate = ref(4.5); // Taux d'intérêt annuel

    // Détails des paiements
    const paymentDetails = ref([
      { id: 1, date: '01/10/2024', description: 'Paiement Mensuel', amount: 2000, status: 'Payé' },
      { id: 2, date: '01/09/2024', description: 'Paiement Mensuel', amount: 2000, status: 'Payé' },
      { id: 3, date: '01/08/2024', description: 'Paiement Mensuel', amount: 2000, status: 'Payé' },
      { id: 4, date: '01/07/2024', description: 'Paiement Mensuel', amount: 2000, status: 'Payé' },
      { id: 5, date: '01/06/2024', description: 'Paiement Mensuel', amount: 2000, status: 'Payé' }
    ]);

    // Données pour le graphique des paiements restants
    const remainingPaymentsSeries = ref([15, 45]); // Paiements effectués vs restants
    const remainingPaymentsOptions = ref({
      chart: {
        type: 'donut',
        height: 350
      },
      labels: ['Paiements Effectués', 'Paiements Restants'],
      colors: ['#00c853', '#ff6f00'],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    });

    const dataToPass = {
      current: "Prêt",
      list: ['Comptes', 'Prêt']
    };

    return {
      dataToPass,
      totalLoan,
      remainingBalance,
      interestRate,
      paymentDetails,
      remainingPaymentsSeries,
      remainingPaymentsOptions,
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
.loan-card {
  border-radius: 12px;
  padding: 15px;
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
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

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}
</style>
