document.addEventListener('DOMContentLoaded', function() {
  // Inicializa os botões de ação flutuantes usando Materialize
  var elems = document.querySelectorAll('.fixed-action-btn');
  
  // Inicializa com ou sem opções, garantindo que "options" esteja definido
  var options = {}; // Adicione opções aqui, se necessário
  M.FloatingActionButton.init(elems, options);
});

// Usando jQuery como alternativa
$(document).ready(function() {
  // Inicializa os botões de ação flutuantes com jQuery
  $('.fixed-action-btn').floatingActionButton();
});