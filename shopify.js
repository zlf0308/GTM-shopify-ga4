   
{% if first_time_accessed %}
  <script>
    gtag('event', 'newPurchase', {
      'value': {{ checkout.subtotal_price | divided_by: 100.0 }},
      'currency': '{{ currency }}',
      'transaction_id': '{{ order_number }}',
    });
  </script>
{% endif %}
