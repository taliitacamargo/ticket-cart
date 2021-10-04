$(document).ready(function() {

  /* Set rates */
  var taxRate = 0.06;
  var fadeTime = 300;

  /* Assign actions */
  $('.ticket-quantity input').change(function() {
    updateQuantity(this);
  });

  $('.remove-item button').click(function() {
    removeItem(this);
  });


  /* Recalculate cart */
  function recalculateCart() {
    var subtotal = 0;


    $('.item').each(function() {
      subtotal += parseFloat($(this).children('.ticket-price').text());
    });

   
    var tax = subtotal * taxRate;
    var total = subtotal + tax;

  
    $('.totals-value').fadeOut(fadeTime, function() {
      $('#cart-subtotal').html(subtotal.toFixed(2));
      $('#cart-tax').html(tax.toFixed(2));
      $('.cart-total').html(total.toFixed(2));
      if (total == 0) {
        $('.checkout').fadeOut(fadeTime);
      } else {
        $('.checkout').fadeIn(fadeTime);
      }
      $('.totals-value').fadeIn(fadeTime);
    });
  }


 
  function updateQuantity(quantityInput) {
   
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

  
    productRow.children('.ticket-quantity').each(function() {
      $(this).fadeOut(fadeTime, function() {
        $(this).text(linePrice.toFixed(2));
        recalculateCart();
        $(this).fadeIn(fadeTime);
      });
    });
  }

  /* Remove item from cart */
  function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function() {
      productRow.remove();
      recalculateCart();
    });
  }

});