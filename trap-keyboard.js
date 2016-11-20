/**
 *
 * Copyright 2016 Ram Lmn(https://github.com/ramlmn).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

export default class TrapKeyboard {

  constructor(container) {

    // Check if the container element is a DOM node 
    if (!(container.nodeType === 1)) {
      console.error('"container" is not a DOM node');
      return;
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
      '[aria-hidden=true]'
    ].join();

    this.boundTrapTabKey = this.trapTabKey.bind(this);
    this.boundOnMutation = this.onMutation.bind(this);

    // Add a MutationObserver to watch for DOM changes
    this.observer = new MutationObserver(this.boundOnMutation);

    this.trap();

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
    this.firstTabStop = this.focusableElements[0];
    this.lastTabStop =
      this.focusableElements[this.focusableElements.length - 1];

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
    this.container.addEventListener('keydown', this.boundTrapTabKey);

    // Need to update on window resize if any CSS Media Queries might change
    // the visibility and display of focusable elements
    window.addEventListener('resize', this.boundOnMutation);

    // Start observing when trap is called
    this.observer.observe(this.container, {
      childList: true,
      attributes: true,
      subtree: true
    });

    // Call this
    this.onMutation();

    // Focus the first element
    this.firstTabStop.focus();

  }

  unTrap() {

    // Remove the event listeners
    this.container.removeEventListener('keydown', this.boundTrapTabKey);
    window.removeEventListener('resize', this.boundOnMutation);

    // And also the mutation observer
    this.observer.disconnect();

  }

}
