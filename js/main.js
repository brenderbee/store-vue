var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
    selectedVariant: 0,
    details: ['80% cotton', '20% polyester', 'gender-neutral'],
    sizes: ['small', 'medium', 'large'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage: 'src/img/vmSocks-green-onWhite.jpg',
        variantQuantity: 10
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: 'src/img/vmSocks-blue-onWhite.jpg',
        variantQuantity: 0
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.inventory--;
      this.cart++;
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title: function() {
      return this.brand + ' ' + this.product;
    },
    image: function() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inventory: function() {
      return this.variants[this.selectedVariant].variantQuantity;
    }
  }
});
