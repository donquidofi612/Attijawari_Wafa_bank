<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 - Vue d'ensemble des comptes -->
  <div class="row">
    <!-- Compte Courant -->
    <div class="col-lg-3 col-md-6 mb-4">
      <div class="card custom-card info-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-wallet2"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Compte Courant</p>
            <h5 class="fw-semibold mb-1">{{ bankData.checkingAccountBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</h5>
            <a href="javascript:void(0);" class="text-primary">Voir détails</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Compte Épargne -->
    <div class="col-lg-3 col-md-6 mb-4">
      <div class="card custom-card info-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-piggy-bank"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Compte Épargne</p>
            <h5 class="fw-semibold mb-1">{{ bankData.savingsBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' }) }}</h5>
            <a href="javascript:void(0);" class="text-primary">Voir détails</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Carte de Crédit -->
    <div class="col-lg-3 col-md-6 mb-4">
      <div class="card custom-card info-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-credit-card"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Carte de Crédit</p>
            <h5 class="fw-semibold mb-1">{{ bankData.creditCardBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' }) }}</h5>
            <a href="javascript:void(0);" class="text-primary">Voir détails</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Prêts -->
    <div class="col-lg-3 col-md-6 mb-4">
      <div class="card custom-card info-card shadow-lg">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container me-3">
            <i class="bi bi-building"></i>
          </div>
          <div>
            <p class="text-muted mb-1">Prêts</p>
            <h5 class="fw-semibold mb-1">{{ bankData.loanBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' }) }}</h5>
            <a href="javascript:void(0);" class="text-primary">Voir détails</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--End::row-1 -->

  <!-- Start::row-2 - Historique et autres détails -->
  <div class="row">
    <!-- Historique des Transactions -->
    <div class="col-lg-6 col-md-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Historique des Transactions
          </div>
        </div>
        <div class="card-body p-0">
          <table class="table text-nowrap table-hover mb-0">
            <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Montant</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(transaction, index) in bankData.recentTransactions" :key="index">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.description }}</td>
              <td :class="{'text-success': transaction.type === 'Crédit', 'text-danger': transaction.type === 'Débit'}">
                {{ transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' }) }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Graphe des Dépenses -->
    <div class="col-lg-6 col-md-12 mb-4">
      <div class="card custom-card shadow-lg">
        <div class="card-header">
          <div class="card-title">
            Graphe des Dépenses
          </div>
        </div>
        <div class="card-body">
          <apexchart type="bar" :options="bankData.expensesOptions" :series="bankData.expensesSeries"></apexchart>
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
import * as bankData from '@/data/financialData.js'; // Importer les données depuis le fichier financialData.js

export default {
  setup() {
    definePageMeta({
      middleware: [auth],
    });

    // Données pour passer à PageHeader
    const dataToPass = {
      current: "Vue d'ensemble",
      list: ['Comptes', 'Vue d\'ensemble']
    };

    return {
      dataToPass,
      bankData // Importer les données du fichier bankData.js directement
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
