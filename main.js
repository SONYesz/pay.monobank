document.querySelectorAll('.option-card').forEach(function(card){
  const type = card.getAttribute('data-type');
  const select = card.querySelector('.num-select');
  const btn = card.querySelector('.choose-btn');

  btn.addEventListener('click', function(){
    const num = select.value;
    const url = new URL('ticket.html', window.location.href);
    url.searchParams.set('type', type);
    url.searchParams.set('num', num);
    url.searchParams.set('ts', Date.now().toString());
    window.location.href = url.toString();
  });
});