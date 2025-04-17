document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })
  
    document.addEventListener("mousedown", () => {
      cursor.style.width = "20px"
      cursor.style.height = "20px"
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
    })
  
    document.addEventListener("mouseup", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
    })
  
    // Links and buttons cursor effect
    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.width = "20px"
        cursor.style.height = "20px"
        cursor.style.backgroundColor = "#fff"
        cursorFollower.style.width = "30px"
        cursorFollower.style.height = "30px"
      })
  
      link.addEventListener("mouseleave", () => {
        cursor.style.width = "10px"
        cursor.style.height = "10px"
        cursor.style.backgroundColor = "#6c63ff"
        cursorFollower.style.width = "40px"
        cursorFollower.style.height = "40px"
      })
    })
  
    // Header scroll effect
    const header = document.querySelector("header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const mobileMenu = document.querySelector(".mobile-menu")
  
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      mobileMenu.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })
  
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll(".mobile-link")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        mobileMenu.classList.remove("active")
        document.body.classList.remove("menu-open")
      })
    })
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Work filter
    const filterButtons = document.querySelectorAll(".filter-btn")
    const workItems = document.querySelectorAll(".work-item")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        const filter = this.getAttribute("data-filter")
  
        workItems.forEach((item) => {
          const categories = item.getAttribute("data-category").split(" ")
  
          if (filter === "all" || categories.includes(filter)) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 100)
          } else {
            item.style.opacity = "0"
            item.style.transform = "scale(0.8)"
            setTimeout(() => {
              item.style.display = "none"
            }, 300)
          }
        })
      })
    })
  
    // Testimonial slider
    const testimonialTrack = document.querySelector(".testimonial-track")
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const prevButton = document.querySelector(".testimonial-prev")
    const nextButton = document.querySelector(".testimonial-next")
    const dots = document.querySelectorAll(".dot")
  
    let currentSlide = 0
    const slideCount = testimonialSlides.length
  
    function goToSlide(index) {
      if (index < 0) index = slideCount - 1
      if (index >= slideCount) index = 0
  
      testimonialTrack.style.transform = `translateX(-${index * 100}%)`
  
      // Update dots
      dots.forEach((dot) => dot.classList.remove("active"))
      dots[index].classList.add("active")
  
      currentSlide = index
    }
  
    prevButton.addEventListener("click", () => {
      goToSlide(currentSlide - 1)
    })
  
    nextButton.addEventListener("click", () => {
      goToSlide(currentSlide + 1)
    })
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index)
      })
    })
  
    // Auto slide testimonials
    setInterval(() => {
      goToSlide(currentSlide + 1)
    }, 5000)
  
    // Animate stats counter
    const stats = document.querySelectorAll(".stat-number")
  
    function animateStats() {
      stats.forEach((stat) => {
        const target = Number.parseInt(stat.getAttribute("data-count"))
        const duration = 2000 // 2 seconds
        const step = target / (duration / 16) // 16ms per frame (approx 60fps)
        let current = 0
  
        const timer = setInterval(() => {
          current += step
          if (current >= target) {
            clearInterval(timer)
            stat.textContent = target
          } else {
            stat.textContent = Math.floor(current)
          }
        }, 16)
      })
    }
  
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("stats-container")) {
            animateStats()
          }
          entry.target.classList.add("animate")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      ".service-card, .work-item, .about-content, .testimonial-content, .stats-container, .contact-content",
    )
  
    animatedElements.forEach((element) => {
      observer.observe(element)
    })
  
    // Form validation
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simple form validation
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value
  
        if (!name || !email || !message) {
          alert("Please fill in all required fields")
          return
        }
  
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address")
          return
        }
  
        // Form submission would go here
        alert("Thank you for your message! We will get back to you soon.")
        contactForm.reset()
      })
    }
  
    // Service card hover effect
    const serviceCards = document.querySelectorAll(".service-card")
  
    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        serviceCards.forEach((c) => c.classList.remove("active"))
        this.classList.add("active")
      })
    })
  
    // Parallax effect for hero section
    const heroSection = document.querySelector(".hero")
    const shapes = document.querySelectorAll(".shape")
  
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset
  
      if (scrollPosition < window.innerHeight) {
        shapes.forEach((shape, index) => {
          const speed = 0.1 * (index + 1)
          shape.style.transform = `translateY(${scrollPosition * speed}px)`
        })
      }
    })
  
    // Initialize animations
    setTimeout(() => {
      document.body.classList.add("loaded")
    }, 500)
  })
  