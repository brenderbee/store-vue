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
          @click="updateProduct(index)"
        >
        </div>

        <button
          v-on:click="addToCart"
          :disabled="inventory < 1"
          :class="{ disabledButton: inventory < 1 }"
        >
          Add to Cart
        </button>

      </div>

      <div>
        <h2>Reviews</h2>
        <p>There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>
      <product-review @review-submitted="addReview"></product-review>

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
      reviews: []
    }
  },
  methods: {
    addToCart: function() {
      this.variants[this.selectedVariant].variantQuantity--;
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
    },
    addReview: function(productReview) {
      this.reviews.push(productReview);
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

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
    <p>
      <label for="name">Name:</label>
      <input id="name" placeholder="name" v-model="name">
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>
      <input type="submit" value="Submit">
    </p>

    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null
    }
  },
  methods: {
    resetForm: function() {
      this.name = null,
      this.review = null,
      this.rating = null
    },
    onSubmit: function() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      }
      this.$emit('review-submitted', productReview);
      this.resetForm();
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    masterPremium: true,
    cart: []
  },
  methods: {
    updateCart: function(id) {
      this.cart.push(id);
    }
  }
});
