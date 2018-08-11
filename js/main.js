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
        variantColor: 'green',
        variantImage: 'src/img/vmSocks-green-onWhite.jpg'
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: 'src/img/vmSocks-blue-onWhite.jpg'
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
