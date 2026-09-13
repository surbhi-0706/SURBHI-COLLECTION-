import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom'

import './App.css'

import saree1 from './assets/saree1.jpeg'
import saree2 from './assets/saree2.jpeg'
import saree3 from './assets/saree3.jpg'


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [
  {
    id: 1,
    name: 'Rose Silk Saree',
    price: 4999,
    category: 'Silk Sarees',
    type: 'Silk',
    stock: 8,
    badge: 'Bestseller',
    description:
      'Elegant rose-toned silk saree with a timeless finish. Designed for graceful occasions and effortless elegance.',
    image: saree1,
  },

  {
    id: 2,
    name: 'Royal Burgundy',
    price: 5499,
    category: 'Designer Sarees',
    type: 'Designer',
    stock: 5,
    badge: 'New',
    description:
      'A rich burgundy saree designed for statement occasions, combining traditional beauty with modern sophistication.',
    image: saree2,
  },

  {
    id: 3,
    name: 'Golden Heritage',
    price: 6999,
    category: 'Festive Sarees',
    type: 'Festive',
    stock: 3,
    badge: 'Limited',
    description:
      'A luxurious golden saree perfect for festive celebrations, weddings and unforgettable evenings.',
    image: saree3,
  },
]


/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  cartItemCount,
  wishlistCount,
  onSearch,
}) {
  const location = useLocation()

  return (
    <header className="site-header">

      <div className="announcement">
        Complimentary shipping on orders above ₹5,000
      </div>

      <nav className="navbar">

        <Link to="/" className="logo">
          <span>Surbhi</span>
          <small>COLLECTION</small>
        </Link>

        <div className="nav-links">

          <Link
            to="/"
            className={
              location.pathname === '/'
                ? 'active'
                : ''
            }
          >
            Home
          </Link>

          <Link
            to="/shop"
            className={
              location.pathname === '/shop'
                ? 'active'
                : ''
            }
          >
            Shop
          </Link>

          <Link
            to="/new-arrivals"
            className={
              location.pathname === '/new-arrivals'
                ? 'active'
                : ''
            }
          >
            New Arrivals
          </Link>

          <Link
            to="/about"
            className={
              location.pathname === '/about'
                ? 'active'
                : ''
            }
          >
            About
          </Link>

        </div>

        <div className="nav-actions">

          <button
            className="nav-icon"
            onClick={onSearch}
            aria-label="Search"
          >
            ⌕
          </button>

          <Link
            to="/wishlist"
            className="nav-icon nav-badge"
            aria-label="Wishlist"
          >
            ♡

            {wishlistCount > 0 && (
              <span>{wishlistCount}</span>
            )}
          </Link>

          <Link
            to="/cart"
            className="nav-icon nav-badge"
            aria-label="Cart"
          >
            🛍

            {cartItemCount > 0 && (
              <span>{cartItemCount}</span>
            )}
          </Link>

        </div>

      </nav>

    </header>
  )
}


/* =========================================================
   SEARCH OVERLAY
========================================================= */

function SearchOverlay({
  open,
  closeSearch,
  searchTerm,
  setSearchTerm,
  addToCart,
}) {
  const navigate = useNavigate()

  if (!open) {
    return null
  }

  const results = products.filter((product) => {
    const search = searchTerm.toLowerCase()

    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.type.toLowerCase().includes(search)
    )
  })

  const openProduct = (id) => {
    closeSearch()
    setSearchTerm('')
    navigate(`/product/${id}`)
  }

  return (
    <div
      className="search-overlay"
      onClick={closeSearch}
    >

      <div
        className="search-box"
        onClick={(event) => event.stopPropagation()}
      >

        <div className="search-top">

          <p>SEARCH SURBHI COLLECTION</p>

          <button
            onClick={closeSearch}
            aria-label="Close search"
          >
            ×
          </button>

        </div>

        <input
          type="text"
          autoFocus
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          placeholder="Search sarees, collections..."
        />

        <div className="search-popular">

          <span>Popular:</span>

          <button
            onClick={() => setSearchTerm('Silk')}
          >
            Silk
          </button>

          <button
            onClick={() => setSearchTerm('Designer')}
          >
            Designer
          </button>

          <button
            onClick={() => setSearchTerm('Festive')}
          >
            Festive
          </button>

        </div>

        {searchTerm && (
          <div className="search-results-new">

            {results.length > 0 ? (
              results.map((product) => (
                <div
                  className="search-result-new"
                  key={product.id}
                  onClick={() =>
                    openProduct(product.id)
                  }
                >

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <div>

                    <p>{product.category}</p>

                    <h3>{product.name}</h3>

                    <strong>
                      ₹{product.price.toLocaleString('en-IN')}
                    </strong>

                  </div>

                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      addToCart(product)
                    }}
                  >
                    +
                  </button>

                </div>
              ))
            ) : (
              <div className="search-empty">
                No sarees found.
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  )
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const navigate = useNavigate()

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  )

  return (
    <article
      className="product-card-new"
      onClick={() =>
        navigate(`/product/${product.id}`)
      }
    >

      <div className="product-image-new">

        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        <button
          className={`heart-button ${
            isWishlisted ? 'liked' : ''
          }`}
          onClick={(event) => {
            event.stopPropagation()
            toggleWishlist(product)
          }}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        <img
          src={product.image}
          alt={product.name}
        />

        <div className="quick-add">

          <button
            onClick={(event) => {
              event.stopPropagation()
              addToCart(product)
            }}
          >
            ADD TO BAG
          </button>

        </div>

      </div>

      <div className="product-card-info">

        <p className="card-category">
          {product.category}
        </p>

        <h3>{product.name}</h3>

        <div className="product-bottom">

          <span>
            ₹{product.price.toLocaleString('en-IN')}
          </span>

          <small>
            {product.stock} left
          </small>

        </div>

      </div>

    </article>
  )
}


/* =========================================================
   HOME PAGE
========================================================= */

function Home({
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const navigate = useNavigate()

  return (
    <main>

      {/* HERO */}

      <section className="luxury-hero">

        <div className="hero-decoration hero-left">
          ✦
        </div>

        <div className="hero-copy">

          <p className="eyebrow">
            THE NEW INDIAN CLASSIC
          </p>

          <h1>
            Draped in
            <em> Elegance.</em>
          </h1>

          <p className="hero-description">
            Timeless sarees curated for the woman
            who carries tradition in her own way.
          </p>

          <button
            className="gold-button"
            onClick={() => navigate('/shop')}
          >
            EXPLORE THE COLLECTION
            <span>→</span>
          </button>

        </div>

        <div className="hero-side-text">

          <span>01</span>

          <div />

          <p>
            TIMELESS
            <br />
            BY DESIGN
          </p>

        </div>

      </section>


      {/* INTRODUCTION */}

      <section className="home-intro">

        <p className="eyebrow">
          SURBHI COLLECTION
        </p>

        <h2>
          Where heritage meets
          <em> modern femininity.</em>
        </h2>

        <p>
          Discover thoughtfully selected sarees that
          celebrate Indian craftsmanship, rich
          textures and effortless elegance.
        </p>

      </section>


      {/* FEATURED PRODUCTS */}

      <section className="home-products">

        <div className="section-header-new">

          <div>

            <p className="eyebrow">
              THE EDIT
            </p>

            <h2>
              Featured Sarees
            </h2>

          </div>

          <button
            className="text-link"
            onClick={() => navigate('/shop')}
          >
            VIEW ALL
            <span>→</span>
          </button>

        </div>

        <div className="product-grid-new">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          ))}

        </div>

      </section>


      {/* EDITORIAL SECTION */}

      <section className="editorial-banner">

        <div className="editorial-content">

          <p className="eyebrow">
            THE SILK EDIT
          </p>

          <h2>
            Made for moments
            <br />
            worth remembering.
          </h2>

          <button
            className="outline-button"
            onClick={() => navigate('/shop')}
          >
            DISCOVER SILKS
          </button>

        </div>

        <div className="editorial-number">
          02
        </div>

      </section>


      {/* VALUES */}

      <section className="values-section">

        <div className="section-header-center">

          <p className="eyebrow">
            THE SURBHI PROMISE
          </p>

          <h2>
            Beautifully chosen.
          </h2>

        </div>

        <div className="values-grid">

          <div>

            <span>01</span>

            <h3>
              Timeless Design
            </h3>

            <p>
              Pieces chosen to stay beautiful
              beyond a single season.
            </p>

          </div>

          <div>

            <span>02</span>

            <h3>
              Thoughtful Craft
            </h3>

            <p>
              A celebration of texture,
              detail and Indian artistry.
            </p>

          </div>

          <div>

            <span>03</span>

            <h3>
              Made to Be Yours
            </h3>

            <p>
              Sarees that let your personality
              take centre stage.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}


/* =========================================================
   SHOP PAGE
========================================================= */

function Shop({
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')

  let displayedProducts = [...products]

  if (category !== 'All') {
    displayedProducts = displayedProducts.filter(
      (product) => product.type === category
    )
  }

  if (sort === 'low') {
    displayedProducts.sort(
      (a, b) => a.price - b.price
    )
  }

  if (sort === 'high') {
    displayedProducts.sort(
      (a, b) => b.price - a.price
    )
  }

  return (
    <main className="inner-page">

      <section className="page-heading">

        <p className="eyebrow">
          THE COLLECTION
        </p>

        <h1>
          Sarees
        </h1>

        <p>
          Discover pieces chosen for celebrations,
          evenings and everything in between.
        </p>

      </section>


      <section className="shop-area">

        <div className="shop-toolbar">

          <div className="category-tabs">

            {[
              'All',
              'Silk',
              'Designer',
              'Festive',
            ].map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? 'selected'
                    : ''
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}

          </div>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
          >

            <option value="featured">
              Sort: Featured
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

          </select>

        </div>

        <div className="shop-count">
          {displayedProducts.length} pieces
        </div>

        <div className="product-grid-new">

          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          ))}

        </div>

      </section>

    </main>
  )
}


/* =========================================================
   NEW ARRIVALS
========================================================= */

function NewArrivals({
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const newProducts = products.filter(
    (product) =>
      product.badge === 'New' ||
      product.badge === 'Limited'
  )

  return (
    <main className="inner-page">

      <section className="page-heading">

        <p className="eyebrow">
          JUST ARRIVED
        </p>

        <h1>
          New Arrivals
        </h1>

        <p>
          Fresh expressions of timeless Indian
          elegance.
        </p>

      </section>


      <section className="shop-area">

        <div className="new-arrival-intro">

          <div>
            NEW
          </div>

          <p>
            Meet the newest additions to the
            Surbhi Collection — thoughtfully chosen
            for your next unforgettable occasion.
          </p>

        </div>

        <div className="product-grid-new">

          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          ))}

        </div>

      </section>

    </main>
  )
}


/* =========================================================
   PRODUCT DETAILS
========================================================= */

function ProductDetails({
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = products.find(
    (item) => item.id === Number(id)
  )

  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <main className="not-found">

        <h1>
          Piece not found
        </h1>

        <button
          className="gold-button"
          onClick={() => navigate('/shop')}
        >
          BACK TO SHOP
        </button>

      </main>
    )
  }

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  )

  const handleAddToCart = () => {
    addToCart(product, quantity)
    navigate('/cart')
  }

  return (
    <main className="product-page">

      <button
        className="back-link"
        onClick={() => navigate('/shop')}
      >
        ← BACK TO COLLECTION
      </button>

      <div className="product-detail-layout">

        <div className="product-detail-image">

          {product.badge && (
            <span className="product-detail-badge">
              {product.badge}
            </span>
          )}

          <img
            src={product.image}
            alt={product.name}
          />

        </div>


        <div className="product-detail-info">

          <p className="eyebrow">
            {product.category}
          </p>

          <h1>
            {product.name}
          </h1>

          <div className="stars">
            ★★★★★
            <span>
              Loved by our customers
            </span>
          </div>

          <p className="detail-price">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          <div className="detail-line" />

          <p className="detail-description">
            {product.description}
          </p>


          <div className="detail-info-row">

            <span>
              AVAILABILITY
            </span>

            <strong>
              {product.stock} pieces available
            </strong>

          </div>


          <div className="quantity-row">

            <span>
              QUANTITY
            </span>

            <div className="quantity-box">

              <button
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((current) =>
                    Math.min(
                      product.stock,
                      current + 1
                    )
                  )
                }
              >
                +
              </button>

            </div>

          </div>


          <div className="detail-actions">

            <button
              className={`detail-heart ${
                isWishlisted ? 'active' : ''
              }`}
              onClick={() =>
                toggleWishlist(product)
              }
              aria-label="Wishlist"
            >
              {isWishlisted ? '♥' : '♡'}
            </button>

            <button
              className="gold-button large"
              onClick={handleAddToCart}
            >
              ADD TO BAG
              <span>→</span>
            </button>

          </div>


          <div className="product-notes">

            <div>
              <span>✦</span>
              Complimentary shipping above ₹5,000
            </div>

            <div>
              <span>✦</span>
              Carefully packed with love
            </div>

            <div>
              <span>✦</span>
              Easy returns on eligible orders
            </div>

          </div>

        </div>

      </div>

    </main>
  )
}


/* =========================================================
   WISHLIST
========================================================= */

function Wishlist({
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const navigate = useNavigate()

  return (
    <main className="inner-page">

      <section className="page-heading">

        <p className="eyebrow">
          YOUR EDIT
        </p>

        <h1>
          Wishlist
        </h1>

        <p>
          Pieces you've fallen a little in love with.
        </p>

      </section>


      <section className="wishlist-page">

        {wishlist.length === 0 ? (

          <div className="empty-page">

            <div className="empty-symbol">
              ♡
            </div>

            <h2>
              Your wishlist is waiting.
            </h2>

            <p>
              Save the pieces you love and
              come back to them anytime.
            </p>

            <button
              className="gold-button"
              onClick={() => navigate('/shop')}
            >
              EXPLORE SAREES
            </button>

          </div>

        ) : (

          <div className="product-grid-new">

            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            ))}

          </div>

        )}

      </section>

    </main>
  )
}


/* =========================================================
   CART
========================================================= */

function Cart({
  cart,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
}) {
  const navigate = useNavigate()

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )

  return (
    <main className="inner-page">

      <section className="page-heading compact">

        <p className="eyebrow">
          YOUR BAG
        </p>

        <h1>
          Shopping Cart
        </h1>

      </section>


      {cart.length === 0 ? (

        <div className="empty-page">

          <div className="empty-symbol">
            🛍
          </div>

          <h2>
            Your bag is empty.
          </h2>

          <p>
            Something beautiful is waiting for you.
          </p>

          <button
            className="gold-button"
            onClick={() => navigate('/shop')}
          >
            CONTINUE SHOPPING
          </button>

        </div>

      ) : (

        <section className="cart-page-layout">

          <div className="cart-page-items">

            {cart.map((item) => (

              <div
                className="cart-page-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />


                <div className="cart-page-item-info">

                  <p>
                    {item.category}
                  </p>

                  <h3>
                    {item.name}
                  </h3>

                  <span>
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>


                  <div className="cart-page-quantity">

                    <button
                      onClick={() =>
                        decreaseCartQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseCartQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>


                <div className="cart-page-item-right">

                  <strong>
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString('en-IN')}
                  </strong>

                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>


          <aside className="cart-summary">

            <p className="eyebrow">
              ORDER SUMMARY
            </p>

            <h2>
              Your Selection
            </h2>


            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{total.toLocaleString('en-IN')}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Shipping
              </span>

              <span>
                {total >= 5000
                  ? 'Complimentary'
                  : 'Calculated at checkout'}
              </span>

            </div>


            <div className="summary-line" />


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{total.toLocaleString('en-IN')}
              </strong>

            </div>


            <button
              className="gold-button full"
              onClick={() => navigate('/checkout')}
            >
              PROCEED TO CHECKOUT
              <span>→</span>
            </button>


            <button
              className="continue-link"
              onClick={() => navigate('/shop')}
            >
              ← Continue Shopping
            </button>

          </aside>

        </section>

      )}

    </main>
  )
}


/* =========================================================
   CHECKOUT
========================================================= */

function Checkout({ cart }) {
  const navigate = useNavigate()

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <main className="empty-page">

        <h2>
          Your bag is empty.
        </h2>

        <button
          className="gold-button"
          onClick={() => navigate('/shop')}
        >
          SHOP NOW
        </button>

      </main>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    alert(
      'Your details are saved. Razorpay payment will be connected next.'
    )
  }

  return (
    <main className="checkout-page">

      <div className="checkout-header">

        <button
          className="back-link"
          onClick={() => navigate('/cart')}
        >
          ← BACK TO BAG
        </button>

        <p className="eyebrow">
          SURBHI COLLECTION
        </p>

        <h1>
          Checkout
        </h1>

      </div>


      <div className="checkout-layout">

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          {/* CONTACT */}

          <div className="checkout-block">

            <p className="eyebrow">
              01 — CONTACT
            </p>

            <h2>
              Your details
            </h2>

            <input
              required
              type="text"
              placeholder="Full name"
            />

            <input
              required
              type="email"
              placeholder="Email address"
            />

            <input
              required
              type="tel"
              placeholder="Phone number"
            />

          </div>


          {/* DELIVERY */}

          <div className="checkout-block">

            <p className="eyebrow">
              02 — DELIVERY
            </p>

            <h2>
              Shipping address
            </h2>

            <input
              required
              type="text"
              placeholder="Address"
            />

            <div className="two-inputs">

              <input
                required
                type="text"
                placeholder="City"
              />

              <input
                required
                type="text"
                placeholder="PIN code"
              />

            </div>

            <input
              required
              type="text"
              placeholder="State"
            />

          </div>


          {/* PAYMENT */}

          <div className="checkout-block">

            <p className="eyebrow">
              03 — PAYMENT
            </p>

            <h2>
              Secure payment
            </h2>

            <div className="payment-placeholder">

              <span>
                ♡
              </span>

              <div>

                <strong>
                  Secure online payment
                </strong>

                <p>
                  Your payment will be securely
                  processed through our payment gateway.
                </p>

              </div>

            </div>

          </div>


          <button
            className="gold-button full"
            type="submit"
          >
            CONTINUE TO PAYMENT
            <span>→</span>
          </button>

        </form>


        {/* ORDER SUMMARY */}

        <aside className="checkout-summary">

          <p className="eyebrow">
            YOUR ORDER
          </p>

          <h2>
            {cart.length}{' '}
            {cart.length === 1
              ? 'piece'
              : 'pieces'}
          </h2>


          {cart.map((item) => (

            <div
              className="checkout-product"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>

                <h3>
                  {item.name}
                </h3>

                <p>
                  Qty: {item.quantity}
                </p>

              </div>

              <strong>
                ₹
                {(
                  item.price *
                  item.quantity
                ).toLocaleString('en-IN')}
              </strong>

            </div>

          ))}


          <div className="summary-line" />


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total.toLocaleString('en-IN')}
            </strong>

          </div>

        </aside>

      </div>

    </main>
  )
}


/* =========================================================
   ABOUT PAGE
========================================================= */

function About() {
  return (
    <main className="about-page">

      <section className="about-hero">

        <p className="eyebrow">
          OUR STORY
        </p>

        <h1>
          Tradition,
          <em> Reimagined.</em>
        </h1>

        <p>
          Surbhi Collection brings together
          timeless Indian craftsmanship and
          contemporary elegance.
        </p>

      </section>


      <section className="about-story">

        <div className="about-number">
          01
        </div>

        <div>

          <p className="eyebrow">
            THE BEGINNING
          </p>

          <h2>
            Every drape tells
            <em> a story.</em>
          </h2>

          <p>
            We believe a saree is more than a
            garment. It carries memories,
            celebrations, traditions and the
            individuality of the woman who wears it.
          </p>

          <p>
            Surbhi Collection is built around
            thoughtfully selected pieces that bring
            together the richness of Indian heritage
            with a sense of modern, effortless style.
          </p>

        </div>

      </section>


      <section className="about-dark">

        <p className="eyebrow">
          OUR PHILOSOPHY
        </p>

        <h2>
          Wear your heritage.
          <br />
          <em>Your way.</em>
        </h2>

      </section>

    </main>
  )
}


/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        <div className="footer-brand">

          <Link
            to="/"
            className="logo footer-logo"
          >
            <span>
              Surbhi
            </span>

            <small>
              COLLECTION
            </small>
          </Link>

          <p>
            Timeless sarees.
            <br />
            Modern elegance.
          </p>

        </div>


        <div className="footer-column">

          <h4>
            SHOP
          </h4>

          <Link to="/shop">
            Sarees
          </Link>

          <Link to="/new-arrivals">
            New Arrivals
          </Link>

          <Link to="/wishlist">
            Wishlist
          </Link>

        </div>


        <div className="footer-column">

          <h4>
            ABOUT
          </h4>

          <Link to="/about">
            Our Story
          </Link>

          <a href="#contact">
            Contact
          </a>

          <a href="#shipping">
            Shipping
          </a>

        </div>


        <div className="footer-column">

          <h4>
            FOLLOW
          </h4>

          <a href="#instagram">
            Instagram
          </a>

          <a href="#pinterest">
            Pinterest
          </a>

        </div>

      </div>


      <div className="footer-bottom">

        <span>
          © 2026 Surbhi Collection
        </span>

        <span>
          Crafted with elegance ♡
        </span>

      </div>

    </footer>
  )
}


/* =========================================================
   MAIN APP
========================================================= */

function App() {

  const [cart, setCart] = useState([])

  const [wishlist, setWishlist] =
    useState([])

  const [searchOpen, setSearchOpen] =
    useState(false)

  const [searchTerm, setSearchTerm] =
    useState('')


  /* =======================================================
     CART FUNCTIONS
  ======================================================= */

  const addToCart = (
    product,
    amount = 1
  ) => {

    setCart((currentCart) => {

      const existingProduct =
        currentCart.find(
          (item) => item.id === product.id
        )

      if (existingProduct) {

        return currentCart.map((item) => {

          if (item.id !== product.id) {
            return item
          }

          return {
            ...item,

            quantity: Math.min(
              item.quantity + amount,
              product.stock
            ),
          }

        })
      }

      return [
        ...currentCart,

        {
          ...product,
          quantity: Math.min(
            amount,
            product.stock
          ),
        },
      ]
    })
  }


  const increaseCartQuantity = (id) => {

    setCart((currentCart) =>

      currentCart.map((item) => {

        if (item.id !== id) {
          return item
        }

        return {
          ...item,

          quantity: Math.min(
            item.quantity + 1,
            item.stock
          ),
        }

      })
    )
  }


  const decreaseCartQuantity = (id) => {

    setCart((currentCart) =>

      currentCart

        .map((item) => {

          if (item.id !== id) {
            return item
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          }

        })

        .filter(
          (item) => item.quantity > 0
        )
    )
  }


  const removeFromCart = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    )
  }


  /* =======================================================
     WISHLIST FUNCTIONS
  ======================================================= */

  const toggleWishlist = (product) => {

    setWishlist((currentWishlist) => {

      const exists =
        currentWishlist.some(
          (item) => item.id === product.id
        )

      if (exists) {

        return currentWishlist.filter(
          (item) => item.id !== product.id
        )
      }

      return [
        ...currentWishlist,
        product,
      ]
    })
  }


  /* =======================================================
     COUNTS
  ======================================================= */

  const cartItemCount = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  )

  const wishlistCount =
    wishlist.length


  /* =======================================================
     APP
  ======================================================= */

  return (
    <BrowserRouter>

      <div className="app">

        <Navbar
          cartItemCount={cartItemCount}
          wishlistCount={wishlistCount}
          onSearch={() => setSearchOpen(true)}
        />


        <SearchOverlay
          open={searchOpen}
          closeSearch={() =>
            setSearchOpen(false)
          }
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          addToCart={addToCart}
        />


        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={
              <Home
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            }
          />


          {/* SHOP */}

          <Route
            path="/shop"
            element={
              <Shop
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            }
          />


          {/* NEW ARRIVALS */}

          <Route
            path="/new-arrivals"
            element={
              <NewArrivals
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            }
          />


          {/* PRODUCT */}

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            }
          />


          {/* WISHLIST */}

          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            }
          />


          {/* CART */}

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                increaseCartQuantity={
                  increaseCartQuantity
                }
                decreaseCartQuantity={
                  decreaseCartQuantity
                }
                removeFromCart={
                  removeFromCart
                }
              />
            }
          />


          {/* CHECKOUT */}

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
              />
            }
          />


          {/* ABOUT */}

          <Route
            path="/about"
            element={
              <About />
            }
          />


          {/* FALLBACK */}

          <Route
            path="*"
            element={
              <NotFound />
            }
          />

        </Routes>


        <Footer />

      </div>

    </BrowserRouter>
  )
}


/* =========================================================
   NOT FOUND
========================================================= */

function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="not-found">

      <h1>
        This page doesn't exist.
      </h1>

      <button
        className="gold-button"
        onClick={() => navigate('/')}
      >
        RETURN HOME
      </button>

    </main>
  )
}


export default App