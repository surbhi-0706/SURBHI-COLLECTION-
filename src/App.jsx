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
   PRODUCTS
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
    image: saree1,
    description:
      'A graceful silk saree with rich texture and timeless elegance. Perfect for celebrations, intimate occasions and statement evenings.',
  },
  {
    id: 2,
    name: 'Royal Burgundy',
    price: 5499,
    category: 'Designer Sarees',
    type: 'Designer',
    stock: 5,
    badge: 'New',
    image: saree2,
    description:
      'A sophisticated designer saree in a deep burgundy palette, created for a bold yet refined festive look.',
  },
  {
    id: 3,
    name: 'Golden Heritage',
    price: 6999,
    category: 'Festive Sarees',
    type: 'Festive',
    stock: 3,
    badge: 'Limited',
    image: saree3,
    description:
      'A luxurious festive saree inspired by traditional Indian elegance, featuring a rich golden character.',
  },
]


/* =========================================================
   NAVBAR
   ========================================================= */

function Navbar({
  wishlistCount,
  cartItemCount,
  onSearch,
}) {
  const location = useLocation()

  return (
    <>
      <div className="announcement-bar">
        <span>
          COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹5,000
        </span>
      </div>

      <header className="navbar">

        {/* LOGO */}

        <div className="navbar-left">

          <Link
            to="/"
            className="logo"
            aria-label="Surbhi Collection Home"
          >
            <span>Surbhi</span>
            <span>COLLECTION</span>
          </Link>

        </div>


        {/* NAVIGATION */}

        <nav className="navbar-center">

          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            HOME
          </Link>

          <Link
            to="/shop"
            className={
              location.pathname === '/shop' ? 'active' : ''
            }
          >
            SHOP
          </Link>

          <Link
            to="/new-arrivals"
            className={
              location.pathname === '/new-arrivals'
                ? 'active'
                : ''
            }
          >
            NEW ARRIVALS
          </Link>

          <Link
            to="/about"
            className={
              location.pathname === '/about' ? 'active' : ''
            }
          >
            ABOUT
          </Link>

        </nav>


        {/* ACTIONS */}

        <div className="navbar-right">

          <button
            type="button"
            onClick={onSearch}
            aria-label="Search"
          >
            ⌕
          </button>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
          >
            ♡
            {wishlistCount > 0 && (
              <sup>{wishlistCount}</sup>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
          >
            ♧
            {cartItemCount > 0 && (
              <sup>{cartItemCount}</sup>
            )}
          </Link>

        </div>

      </header>
    </>
  )
}


/* =========================================================
   SEARCH OVERLAY
   ========================================================= */

function SearchOverlay({
  searchTerm,
  setSearchTerm,
  onClose,
}) {
  const navigate = useNavigate()

  const matchingProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <div
      className="search-overlay"
      onClick={onClose}
    >

      <div
        onClick={(event) => event.stopPropagation()}
      >

        <button
          type="button"
          onClick={onClose}
          style={{
            color: 'white',
            border: 'none',
            background: 'transparent',
            fontSize: '28px',
            float: 'right',
          }}
        >
          ×
        </button>

        <input
          autoFocus
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          placeholder="Search sarees..."
        />

        {searchTerm && (
          <div
            style={{
              marginTop: '25px',
              color: 'white',
            }}
          >

            {matchingProducts.length > 0 ? (
              matchingProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    navigate(`/product/${product.id}`)
                    onClose()
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '15px 0',
                    border: 'none',
                    borderBottom:
                      '1px solid rgba(255,255,255,.15)',
                    background: 'transparent',
                    color: 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  {product.name}
                </button>
              ))
            ) : (
              <p style={{ color: 'white' }}>
                No sarees found.
              </p>
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
    <article className="product-card">

      <div
        className="product-image"
        style={{
          position: 'relative',
        }}
      >

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label="Add to wishlist"
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            zIndex: 3,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            border: '1px solid rgba(50,20,63,.15)',
            background: 'rgba(255,253,249,.92)',
            color: isWishlisted
              ? '#d92f68'
              : '#32143f',
            fontSize: '20px',
          }}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        {product.badge && (
          <span
            style={{
              position: 'absolute',
              left: '15px',
              top: '15px',
              zIndex: 2,
              padding: '6px 9px',
              background: '#d92f68',
              color: 'white',
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() =>
            navigate(`/product/${product.id}`)
          }
          style={{
            display: 'block',
            width: '100%',
            padding: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              aspectRatio: '0.78',
              objectFit: 'cover',
            }}
          />
        </button>

      </div>


      <div
        style={{
          padding: '20px',
        }}
      >

        <p
          style={{
            color: '#d92f68',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          {product.category}
        </p>

        <h3
          style={{
            marginTop: '8px',
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            marginTop: '9px',
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            marginTop: '18px',
          }}
        >

          <strong
            style={{
              color: '#32143f',
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '25px',
            }}
          >
            ₹{product.price.toLocaleString('en-IN')}
          </strong>

          <span
            style={{
              color: '#67545e',
              fontSize: '10px',
            }}
          >
            {product.stock} left
          </span>

        </div>


        <button
          type="button"
          className="gold-button"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          style={{
            width: '100%',
            marginTop: '18px',
          }}
        >
          ADD TO CART
          <span>→</span>
        </button>

      </div>

    </article>
  )
}


/* =========================================================
   HOME
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

        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-copy">

          <p className="eyebrow">
            THE NEW INDIAN CLASSIC
          </p>

          <h1>
            Draped in
            <br />
            <em>Elegance.</em>
          </h1>

          <p className="hero-description">
            Timeless sarees curated for the woman
            who carries tradition in her own way.
          </p>

          <div className="hero-actions">

            <button
              className="gold-button"
              onClick={() => navigate('/shop')}
            >
              EXPLORE COLLECTION
              <span>→</span>
            </button>

            <button
              className="hero-text-button"
              onClick={() =>
                navigate('/new-arrivals')
              }
            >
              NEW ARRIVALS
              <span>↗</span>
            </button>

          </div>

          <div className="hero-mini-info">

            <div>
              <strong>50+</strong>
              <span>Curated Styles</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Handpicked</span>
            </div>

            <div>
              <strong>01</strong>
              <span>Signature Edit</span>
            </div>

          </div>

        </div>


        <div className="hero-visual">

          <div className="hero-image-frame">

            <img
              src={saree1}
              alt="Rose Silk Saree"
            />

            <div className="hero-image-overlay" />

          </div>


          <div className="hero-floating-card">

            <span className="floating-label">
              FEATURED EDIT
            </span>

            <strong>
              Rose Silk
            </strong>

            <p>
              Soft. Elegant. Timeless.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate('/product/1')
              }
            >
              DISCOVER
              <span>→</span>
            </button>

          </div>


          <div className="hero-circle-text">
            <span>
              SURBHI · COLLECTION ·
            </span>
          </div>

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


      {/* BRAND STRIP */}

      <section className="brand-strip">

        <div>
          <span>✦</span>
          CURATED INDIAN CRAFT
        </div>

        <div>
          <span>✦</span>
          ELEGANCE IN EVERY DRAPE
        </div>

        <div>
          <span>✦</span>
          DESIGNED FOR YOU
        </div>

        <div>
          <span>✦</span>
          TIMELESS BY DESIGN
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
          celebrate Indian craftsmanship, rich textures
          and effortless elegance.
        </p>

      </section>


      {/* SHOP BY MOOD */}

      <section className="mood-section">

        <div className="section-header-new">

          <div>

            <p className="eyebrow">
              FIND YOUR DRAPE
            </p>

            <h2>
              Shop by Mood
            </h2>

          </div>

          <button
            className="text-link"
            onClick={() => navigate('/shop')}
          >
            VIEW COLLECTION
            <span>→</span>
          </button>

        </div>


        <div className="mood-grid">

          <button
            className="mood-card mood-card-dark"
            onClick={() => navigate('/shop')}
          >

            <div className="mood-number">
              01
            </div>

            <div className="mood-content">

              <span>FOR THE</span>

              <h3>
                Classic
                <em>Woman</em>
              </h3>

              <p>
                Elegant silhouettes with
                timeless charm.
              </p>

            </div>

            <span className="mood-arrow">
              ↗
            </span>

          </button>


          <button
            className="mood-card mood-card-berry"
            onClick={() =>
              navigate('/new-arrivals')
            }
          >

            <div className="mood-number">
              02
            </div>

            <div className="mood-content">

              <span>FOR THE</span>

              <h3>
                Modern
                <em>Muse</em>
              </h3>

              <p>
                Contemporary pieces with
                a traditional soul.
              </p>

            </div>

            <span className="mood-arrow">
              ↗
            </span>

          </button>


          <button
            className="mood-card mood-card-gold"
            onClick={() => navigate('/shop')}
          >

            <div className="mood-number">
              03
            </div>

            <div className="mood-content">

              <span>FOR THE</span>

              <h3>
                Festive
                <em>Spirit</em>
              </h3>

              <p>
                Rich textures and statement
                making elegance.
              </p>

            </div>

            <span className="mood-arrow">
              ↗
            </span>

          </button>

        </div>

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

            <p className="section-subtitle">
              Pieces we can't stop thinking about.
            </p>

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


      {/* EDITORIAL */}

      <section className="editorial-banner">

        <div className="editorial-pattern" />

        <div className="editorial-content">

          <p className="eyebrow">
            THE SILK EDIT
          </p>

          <h2>
            Made for moments
            <br />
            <em>worth remembering.</em>
          </h2>

          <p>
            From intimate celebrations to grand occasions,
            discover silhouettes that make every entrance count.
          </p>

          <button
            className="outline-button"
            onClick={() => navigate('/shop')}
          >
            DISCOVER SILKS
            <span>→</span>
          </button>

        </div>

        <div className="editorial-number">
          02
        </div>

      </section>


      {/* STATS */}

      <section className="collection-stats">

        <div>
          <strong>01</strong>
          <span>Curated Collection</span>
        </div>

        <div>
          <strong>03</strong>
          <span>Signature Sarees</span>
        </div>

        <div>
          <strong>∞</strong>
          <span>Ways to Drape</span>
        </div>

        <div>
          <strong>100%</strong>
          <span>Made to Impress</span>
        </div>

      </section>


      {/* PROMISE */}

      <section className="values-section">

        <div className="section-header-center">

          <p className="eyebrow">
            THE SURBHI PROMISE
          </p>

          <h2>
            Beautifully chosen.
          </h2>

          <p>
            Because the right saree doesn't just complete
            an outfit. It becomes part of your story.
          </p>

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


      {/* FINAL CTA */}

      <section className="home-final-cta">

        <p className="eyebrow">
          YOUR NEXT SIGNATURE LOOK
        </p>

        <h2>
          Find the saree
          <br />
          <em>that feels like you.</em>
        </h2>

        <button
          className="gold-button"
          onClick={() => navigate('/shop')}
        >
          SHOP SURBHI COLLECTION
          <span>→</span>
        </button>

      </section>

    </main>
  )
}


/* =========================================================
   PAGE HEADER
   ========================================================= */

function PageHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <section className="inner-page-header">

      <p className="eyebrow">
        {eyebrow}
      </p>

      <h1>
        {title}
      </h1>

      {description && (
        <p>
          {description}
        </p>
      )}

    </section>
  )
}


/* =========================================================
   SHOP
   ========================================================= */

function Shop({
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')

  const categories = [
    'All',
    'Silk',
    'Designer',
    'Festive',
  ]

  let filteredProducts =
    category === 'All'
      ? [...products]
      : products.filter(
          (product) => product.type === category
        )

  if (sort === 'low') {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    )
  }

  if (sort === 'high') {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    )
  }

  return (
    <main>

      <PageHeader
        eyebrow="THE COLLECTION"
        title="Shop Sarees"
        description="Discover pieces selected for timeless elegance."
      />

      <section className="shop-page">

        <div className="shop-toolbar">

          <div className="shop-filters">

            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

          <div className="shop-sort">

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
            >
              <option value="featured">
                Featured
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>
            </select>

          </div>

        </div>


        <div className="product-grid-new">

          {filteredProducts.map((product) => (
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
  return (
    <main>

      <PageHeader
        eyebrow="JUST IN"
        title="New Arrivals"
        description="Fresh additions to the Surbhi Collection."
      />

      <section className="shop-page">

        <div className="product-grid-new">

          {products
            .filter(
              (product) =>
                product.badge === 'New' ||
                product.badge === 'Bestseller'
            )
            .map((product) => (
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

  if (!product) {
    return (
      <NotFound />
    )
  }

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  )

  const relatedProducts = products.filter(
    (item) => item.id !== product.id
  )

  return (
    <main>

      <section className="product-details">

        <div className="product-detail-grid">

          <div className="product-detail-image">

            <img
              src={product.image}
              alt={product.name}
            />

          </div>


          <div className="product-detail-info">

            <span className="category">
              {product.category}
            </span>

            <h1>
              {product.name}
            </h1>

            <div className="price">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <p>
              {product.description}
            </p>

            <p
              style={{
                marginTop: '15px',
                color:
                  product.stock <= 3
                    ? '#d92f68'
                    : '#67545e',
                fontWeight: 600,
              }}
            >
              {product.stock <= 3
                ? `Only ${product.stock} left in stock`
                : `${product.stock} pieces available`}
            </p>


            <div className="product-detail-actions">

              <button
                className="gold-button"
                onClick={() =>
                  addToCart(product)
                }
              >
                ADD TO CART
                <span>→</span>
              </button>

              <button
                className="outline-button"
                onClick={() =>
                  toggleWishlist(product)
                }
                style={{
                  color: '#32143f',
                  borderColor: '#32143f',
                }}
              >
                {isWishlisted
                  ? 'REMOVE FROM WISHLIST'
                  : 'ADD TO WISHLIST'}
              </button>

            </div>

          </div>

        </div>


        {/* RELATED */}

        <div
          style={{
            maxWidth: '1200px',
            margin: '100px auto 0',
          }}
        >

          <div className="section-header-new">

            <div>

              <p className="eyebrow">
                YOU MAY ALSO LIKE
              </p>

              <h2>
                More to discover
              </h2>

            </div>

            <button
              className="text-link"
              onClick={() => navigate('/shop')}
            >
              SHOP ALL
              <span>→</span>
            </button>

          </div>

          <div className="product-grid-new">

            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            ))}

          </div>

        </div>

      </section>

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
  return (
    <main>

      <PageHeader
        eyebrow="YOUR EDIT"
        title="Wishlist"
        description="Pieces you've saved for later."
      />

      <section className="wishlist-page">

        {wishlist.length === 0 ? (

          <div className="wishlist-empty">

            <h2>
              Nothing here yet.
            </h2>

            <p>
              Save the sarees you love and
              find them here whenever you're ready.
            </p>

            <Link
              to="/shop"
              className="gold-button"
            >
              EXPLORE SAREES
              <span>→</span>
            </Link>

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

  const shippingThreshold = 5000

  const remaining = Math.max(
    shippingThreshold - total,
    0
  )

  const shippingProgress = Math.min(
    (total / shippingThreshold) * 100,
    100
  )

  return (
    <main>

      <PageHeader
        eyebrow="YOUR EDIT"
        title="Shopping Bag"
        description="Review your selected pieces."
      />

      <section className="cart-page">

        {cart.length === 0 ? (

          <div className="wishlist-empty">

            <h2>
              Your bag is empty.
            </h2>

            <p>
              Your next signature saree is waiting.
            </p>

            <button
              className="gold-button"
              onClick={() => navigate('/shop')}
            >
              START SHOPPING
              <span>→</span>
            </button>

          </div>

        ) : (

          <div className="cart-layout">

            <div>

              {/* FREE SHIPPING */}

              <div
                style={{
                  padding: '18px',
                  marginBottom: '25px',
                  background: '#fff3ed',
                  border:
                    '1px solid #eadbdd',
                }}
              >

                <p
                  style={{
                    marginBottom: '10px',
                    color: '#32143f',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  {remaining > 0
                    ? `Add ₹${remaining.toLocaleString(
                        'en-IN'
                      )} more for complimentary shipping.`
                    : 'You unlocked complimentary shipping!'}
                </p>

                <div
                  style={{
                    height: '6px',
                    background: '#eadbdd',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${shippingProgress}%`,
                      height: '100%',
                      background: '#d92f68',
                    }}
                  />
                </div>

              </div>


              {cart.map((item) => (

                <div
                  className="cart-item"
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
                      ₹{item.price.toLocaleString(
                        'en-IN'
                      )}
                    </p>

                    <div className="cart-quantity">

                      <button
                        onClick={() =>
                          decreaseCartQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <strong>
                        {item.quantity}
                      </strong>

                      <button
                        onClick={() =>
                          increaseCartQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>


                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >

                    <strong
                      style={{
                        color: '#32143f',
                      }}
                    >
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString('en-IN')}
                    </strong>

                    <br />

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      style={{
                        marginTop: '12px',
                        border: 'none',
                        background: 'transparent',
                        color: '#d92f68',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                      }}
                    >
                      REMOVE
                    </button>

                  </div>

                </div>

              ))}

            </div>


            {/* SUMMARY */}

            <aside className="cart-summary">

              <h2>
                Summary
              </h2>

              <p>
                <span>Subtotal</span>
                <span>
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </p>

              <p>
                <span>Shipping</span>
                <span>
                  {total >= shippingThreshold
                    ? 'FREE'
                    : 'Calculated at checkout'}
                </span>
              </p>

              <p className="total">
                <span>Total</span>
                <strong>
                  ₹{total.toLocaleString('en-IN')}
                </strong>
              </p>

              <button
                className="gold-button"
                onClick={() =>
                  navigate('/checkout')
                }
              >
                PROCEED TO CHECKOUT
                <span>→</span>
              </button>

            </aside>

          </div>

        )}

      </section>

    </main>
  )
}


/* =========================================================
   CHECKOUT
   ========================================================= */

function Checkout({
  cart,
}) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )

  function updateField(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleCheckout(event) {
    event.preventDefault()

    alert(
      'Your order details are ready. Razorpay payment integration will be connected next.'
    )
  }

  if (cart.length === 0) {
    return (
      <main>

        <PageHeader
          eyebrow="CHECKOUT"
          title="Your bag is empty"
        />

        <div className="wishlist-empty">

          <p>
            Add a saree before proceeding to checkout.
          </p>

          <button
            className="gold-button"
            onClick={() => navigate('/shop')}
          >
            SHOP SAREES
            <span>→</span>
          </button>

        </div>

      </main>
    )
  }

  return (
    <main>

      <PageHeader
        eyebrow="SECURE CHECKOUT"
        title="Complete Your Order"
        description="Enter your details to continue."
      />

      <section className="checkout-page">

        <div className="checkout-layout">

          <form
            className="checkout-form"
            onSubmit={handleCheckout}
          >

            <h2>
              Delivery Details
            </h2>

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              value={form.name}
              onChange={updateField}
              required
            />


            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              required
            />


            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={updateField}
              required
            />


            <label htmlFor="address">
              Address
            </label>

            <textarea
              id="address"
              name="address"
              rows="4"
              value={form.address}
              onChange={updateField}
              required
            />


            <label htmlFor="city">
              City
            </label>

            <input
              id="city"
              name="city"
              value={form.city}
              onChange={updateField}
              required
            />


            <label htmlFor="state">
              State
            </label>

            <input
              id="state"
              name="state"
              value={form.state}
              onChange={updateField}
              required
            />


            <label htmlFor="pincode">
              Pincode
            </label>

            <input
              id="pincode"
              name="pincode"
              value={form.pincode}
              onChange={updateField}
              required
            />


            <button
              type="submit"
              className="gold-button"
              style={{
                width: '100%',
                marginTop: '28px',
              }}
            >
              CONTINUE TO PAYMENT
              <span>→</span>
            </button>

          </form>


          <aside className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            {cart.map((item) => (
              <p key={item.id}>

                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString('en-IN')}
                </span>

              </p>
            ))}

            <p
              style={{
                marginTop: '20px',
                paddingTop: '18px',
                borderTop:
                  '1px solid rgba(255,255,255,.18)',
                color: 'white',
                fontWeight: 700,
              }}
            >

              <span>
                Total
              </span>

              <span>
                ₹{total.toLocaleString('en-IN')}
              </span>

            </p>

          </aside>

        </div>

      </section>

    </main>
  )
}


/* =========================================================
   ABOUT
   ========================================================= */

function About() {
  return (
    <main className="about-page">

      <PageHeader
        eyebrow="OUR STORY"
        title="About Surbhi"
        description="A collection built around timeless Indian elegance."
      />

      <section className="about-content">

        <p className="eyebrow">
          THE SURBHI STORY
        </p>

        <h2>
          Tradition,
          <br />
          reimagined for today.
        </h2>

        <p>
          Surbhi Collection is built around the belief
          that a saree should feel timeless while still
          feeling completely yours.
        </p>

        <p>
          Every piece is thoughtfully selected with an
          appreciation for Indian craftsmanship, rich
          textures, elegant colours and modern femininity.
        </p>

        <p>
          From everyday elegance to unforgettable
          celebrations, our collection is designed to
          become part of your most beautiful moments.
        </p>

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

      <div
        style={{
          maxWidth: '1200px',
          margin: 'auto',
          padding: '70px 7% 45px',
          display: 'grid',
          gridTemplateColumns:
            '1.4fr 1fr 1fr 1fr',
          gap: '45px',
        }}
      >

        <div>

          <Link
            to="/"
            className="logo"
            style={{
              alignItems: 'flex-start',
            }}
          >
            <span>Surbhi</span>
            <span>COLLECTION</span>
          </Link>

          <p
            style={{
              marginTop: '25px',
              maxWidth: '230px',
              color:
                'rgba(255,248,243,.72)',
              fontSize: '13px',
            }}
          >
            Timeless sarees.
            <br />
            Modern elegance.
          </p>

        </div>


        <div>

          <h4
            style={{
              color: '#f1cf73',
              fontSize: '10px',
              letterSpacing: '2px',
              marginBottom: '20px',
            }}
          >
            SHOP
          </h4>

          <p><Link to="/shop">Sarees</Link></p>
          <p><Link to="/new-arrivals">New Arrivals</Link></p>
          <p><Link to="/wishlist">Wishlist</Link></p>

        </div>


        <div>

          <h4
            style={{
              color: '#f1cf73',
              fontSize: '10px',
              letterSpacing: '2px',
              marginBottom: '20px',
            }}
          >
            ABOUT
          </h4>

          <p><Link to="/about">Our Story</Link></p>
          <p><Link to="/about">Contact</Link></p>
          <p><Link to="/about">Shipping</Link></p>

        </div>


        <div>

          <h4
            style={{
              color: '#f1cf73',
              fontSize: '10px',
              letterSpacing: '2px',
              marginBottom: '20px',
            }}
          >
            FOLLOW
          </h4>

          <p>
            <a href="#instagram">
              Instagram
            </a>
          </p>

          <p>
            <a href="#pinterest">
              Pinterest
            </a>
          </p>

        </div>

      </div>


      <div
        className="footer-bottom"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
          padding: '20px 7%',
          color:
            'rgba(255,248,243,.55)',
          fontSize: '10px',
        }}
      >

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
   NOT FOUND
   ========================================================= */

function NotFound() {
  return (
    <main className="not-found">

      <p className="eyebrow">
        OOPS
      </p>

      <h1>
        404
      </h1>

      <h2>
        Page not found.
      </h2>

      <p>
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="gold-button"
        style={{
          marginTop: '25px',
        }}
      >
        BACK HOME
        <span>→</span>
      </Link>

    </main>
  )
}


/* =========================================================
   APP
   ========================================================= */

function App() {

  const [wishlist, setWishlist] = useState([])

  const [cart, setCart] = useState([])

  const [searchOpen, setSearchOpen] =
    useState(false)

  const [searchTerm, setSearchTerm] =
    useState('')


  /* ---------------- WISHLIST ---------------- */

  function toggleWishlist(product) {
    setWishlist((current) => {

      const exists = current.some(
        (item) => item.id === product.id
      )

      if (exists) {
        return current.filter(
          (item) => item.id !== product.id
        )
      }

      return [...current, product]
    })
  }


  /* ---------------- CART ---------------- */

  function addToCart(product, amount = 1) {

    setCart((current) => {

      const existing = current.find(
        (item) => item.id === product.id
      )

      if (existing) {

        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + amount,
                  product.stock
                ),
              }
            : item
        )
      }

      return [
        ...current,
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


  function increaseCartQuantity(productId) {

    setCart((current) =>
      current.map((item) => {

        if (item.id !== productId) {
          return item
        }

        const product = products.find(
          (item) => item.id === productId
        )

        return {
          ...item,
          quantity: Math.min(
            item.quantity + 1,
            product.stock
          ),
        }
      })
    )
  }


  function decreaseCartQuantity(productId) {

    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    )
  }


  function removeFromCart(productId) {

    setCart((current) =>
      current.filter(
        (item) => item.id !== productId
      )
    )
  }


  const cartItemCount = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  )


  return (
    <BrowserRouter>

      <Navbar
        wishlistCount={wishlist.length}
        cartItemCount={cartItemCount}
        onSearch={() => setSearchOpen(true)}
      />


      {searchOpen && (
        <SearchOverlay
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClose={() => {
            setSearchOpen(false)
            setSearchTerm('')
          }}
        />
      )}


      <Routes>

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

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
            />
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>


      <Footer />

    </BrowserRouter>
  )
}


/* =========================================================
   DEFAULT EXPORT — IMPORTANT
   ========================================================= */

export default App