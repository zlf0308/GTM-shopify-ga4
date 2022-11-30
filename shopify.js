//1. click “Add new snippet” and name it “product-datalayer” and CREATE.
// product-datalayer
<script type="text/javascript">
  window.dataLayer = window.dataLayer || [];

  window.appStart = function(){
    {% assign template_name = template.name %} 

    window.productPageHandle = function(){
      var productName = "{{ product.title | remove: "'" | remove: '"' }}";
      var productId = "{{ product.id }}";
      var productPrice = "{{ product.price | money_without_currency }}";
      var productBrand = "{{ product.vendor | remove: "'" | remove: '"' }}";
      var productCollection = "{{ product.collections.first.title | remove: "'" | remove: '"' }}"

      window.dataLayer.push({
        event: 'gary_productDetail',
        productName: productName,
        productId: productId,
        productPrice: productPrice,
        productBrand: productBrand,
        productCategory: productCollection,
      });
    };

    {% case template_name %}
    {% when 'product' %}
    	productPageHandle()
    {% endcase %}
  }

  appStart();
</script>


//2.Open the theme.liquid file and search "/head" in the file. Paste the following code just above it
{% render 'product-datalayer.liquid' %}

//3. setting - Checkout - Purchase

<script>    
	window.dataLayer = window.dataLayer || [];                                            
	var shipping_price = '{{shipping_price | money_without_currency }}';
	var total_price = '{{total_price | money_without_currency }}';
	var tax_price = '{{tax_price | money_without_currency }}';
	var orderItemsName = []            
	var orderItemsPrice = []
	var orderItemsQuantity = []
	var orderItemsId = []
	var totalQuantity = 0;
	
  {% for line_item in line_items %}
      orderItemsName.push( '{{ line_item.product.title | remove: "'" | remove: '"'}}')
      orderItemsPrice.push('{{ line_item.price | times: 0.01 }}');
      orderItemsQuantity.push('{{ line_item.quantity }}');
      orderItemsId.push('{{ line_item.product_id }}');
      totalQuantity +=  {{ line_item.quantity }};
  {% endfor %}

  {% if first_time_accessed %}
      window.dataLayer.push({
		'page_type': 'purchase',
		'event': 'gary_purchase',
		'currency': "{{ shop.currency }}",
		'totalValue': total_price,
		'shipping': shipping_price,
		'tax': tax_price,
		'payment_type': '{{order.transactions[0].gateway}}',
		'transaction_id': "{{order.order_number}}",
		'productName': orderItemsName,
		'productPrice': orderItemsPrice,
		'productQuantity': orderItemsQuantity,
		'productId': orderItemsId,
	});
  {% endif %}
</script>
