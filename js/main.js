var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: 'src/img/vmSocks-green-onWhite.jpg',
    inventory: 100,
    details: ['80% cotton', '20% polyester', 'gender-neutral'],
    sizes: ['small', 'medium', 'large'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green'
      },
      {
        variantId: 2235,
        variantColor: 'blue'
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart++;
    }
  }
});
