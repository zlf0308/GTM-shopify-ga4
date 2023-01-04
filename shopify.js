<script>    
 window.dataLayer = window.dataLayer || [];                                            
 
{% if first_time_accessed %}
  window.dataLayer.push({
       'page_type': 'purchase',
       'event': 'newPurchase',
       'value': '{{ checkout.subtotal_price | divided_by: 100.0 }}',
       'currency': '{{ currency }}',
       'transaction_id': '{{ order_number }}',
       'totalValue': '{{total_price | money_without_currency }}',
       'shipping': '{{shipping_price | money_without_currency }}',
       'tax': '{{tax_price | money_without_currency }}',
  });
{% endif %}
</script>
