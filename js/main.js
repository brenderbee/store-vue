Vue.component('Product', {
  props: {
    childPremium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ inventory }} left</p>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <h3>Details</h3>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <h3>Sizes</h3>
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <h3>Colors</h3>
        <div
          v-for="(variant, index) in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)"
        >
        </div>

        <button
          v-on:click="addToCart"
          :disabled="inventory < 1"
          :class="{ disabledButton: inventory < 1 }"
        >
          Add to Cart
        </button>
        <div class="cart">
          <p>Cart ({{ cart }})</p>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
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
    }
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
    },
    shipping: function() {
      if (this.childPremium) {
        return 'Free';
      }
      return '2.99';
    }
   }
});

var app = new Vue({
  el: '#app',
  data: {
    masterPremium: true
  }
});
