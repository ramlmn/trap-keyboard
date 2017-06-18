'use strict';

class TrapKeyboard {
  constructor(container, trapDefault = true) {
    // Check if the container element is a DOM node
    if (!(container.nodeType === 1)) {
      return new TypeError('Element provided is not ElementNode');
    }

    this.container = container;

    // Query all possible focusable elements
    this.focusableElementsString = [
      'a[href]',
      'area[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[tabindex]:not([tabindex^="-"])',
      '[contenteditable]',
      '[aria-hidden=false]',
    ].join();

    this.trapTabKey = this.trapTabKey.bind(this);
    this.onMutation = this.onMutation.bind(this);

    // Add a MutationObserver to watch for DOM changes
    this.observer = new MutationObserver(this.onMutation);

    // Start the observer
    this.observer.observe(this.container, {
      childList: true,
      attributes: true,
      subtree: true,
    });

    // Need to update on window resize if any CSS Media Queries might change
    // the visibility and display of focusable elements
    window.addEventListener('resize', this.onMutation);

    if (trapDefault) {
      this.trap();
    }
  }

  onMutation() {
    let elements = Array.from(
        this.container.querySelectorAll(this.focusableElementsString)
      );
    this.focusableElements = [];

    elements.forEach(el => {
      let gcs = getComputedStyle(el);

      // Check if the element is accessible
      // Note: Not an ideal solution for checking visibility and display
      if (!(gcs.display === 'none')
        || !(gcs.visibility === 'hidden')
        || !(el.getAttribute('tabindex') === -1)) {
        this.focusableElements.push(el);
      }
    });

    // Get the first and last tab stops to act as anchor points
    this.firstTabStop = this.focusableElements[0] || this.container;
    this.lastTabStop =
      this.focusableElements[this.focusableElements.length - 1] || this.container;
  }

  trapTabKey(e) {
    // No elements to focus
    if (this.focusableElements.length === 0) {
      e.preventDefault();
      return;
    }

    // Check for TAB key press
    if (e.keyCode === 9) {
      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === this.firstTabStop) {
          e.preventDefault();
          this.lastTabStop.focus();
        }

      // TAB
      } else {
        if (document.activeElement === this.lastTabStop) {
          e.preventDefault();
          this.firstTabStop.focus();
        }
      }
    }
  }

  trap() {
    // Add a keydown event
    this.container.addEventListener('keydown', this.trapTabKey);

    // Call this once, to setup things
    this.onMutation();

    // Focus the first element
    this.firstTabStop.focus();
  }

  unTrap() {
    // Remove the event listeners
    this.container.removeEventListener('keydown', this.trapTabKey);
  }
}
