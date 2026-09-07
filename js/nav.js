
////
// toggle expandable menu
// see <https://css-tricks.com/using-css-transitions-auto-dimensions/>

// change from css-tricks version:
// expansion and collapse is only relevant for xtra-small
// screens (max-width 767px), and within that media scope,
// we put our 'height: 0' and 'height: auto'
// on a style '.expandable-content-xs[data-expanded="true"]'
// (or 'false', as the case may be).
// So when we're _marking_ that data-expanded attribute,
// it should be the very last thing we do -- so its
// at a slightly different posn in the func to the css-tricks
// example.
function collapseEl(el) {
  // get real height of inner content
  var elHeight = el.scrollHeight;
  // temporarily disable all css transitions
  var elementTransition = el.style.transition;
  //console.log("collapsing. el = ", [el], ", ht = ", elHeight, ", style= ", el.style, "trans:", elementTransition);
  el.style.transition = '';

  // as soon as that style change has taken effect,
  // explicitly set height to current pixel height so we
  // aren't transitioning out of 'auto'
  requestAnimationFrame(function() {
    el.style.height     = elHeight + 'px';
    el.style.transition = elementTransition;

    // on frame after height change taken effect,
    // do transition to height: 0
    requestAnimationFrame(function() {
      el.style.height = 0 + 'px';

      // mark as "not currently expanded"
      el.setAttribute('data-expanded', 'false');
    });
  });

}

function expandEl(el) {
  // get height of inner content
  var elHeight = el.scrollHeight;
  // transition to height of inner content
  el.style.height = elHeight + 'px';

  // when the next css transition finishes
  // (which should be the one we just triggered) ...
  el.addEventListener('transitionend', function(e) {
    // only gets trigger once
    el.removeEventListener('transitionend', arguments.callee);
    // remove "height" from the el's inline styles, so it can return to its initial value
    el.style.height = null;
  });

  // mark as "currently expanded"
  el.setAttribute('data-expanded', 'true');
}

////
// de-obfuscate email on hover

function getEmailLinkEls() {
  let anchor_els = document.querySelectorAll('.email')
  return anchor_els;
}

function deObfuscate(el) {
  if(el.decoded != true) {
    el.href = "mailto:" + atob(el.href.replace(/^mailto:/,""));
    el.decoded = true;
  }
};

function obfuscate(el) {
  if(el.decoded != false) {
    el.href = "mailto:" + btoa(el.href.replace(/^mailto:/,""));
    el.decoded = false;
  }
};

////
// add listeners once DOM loaded

document.addEventListener("DOMContentLoaded", function(event) {

  var emailEls = getEmailLinkEls();

  for (let i = 0; i < emailEls.length; i += 1 ) {
    let emailEl = emailEls[i];
    emailEl.onmouseover  = () => deObfuscate(emailEl);
    emailEl.onmouseout   = () => obfuscate(emailEl);
  }

  // nav toggle listener
  const style_to_expand = 'expandable-content-xs';
  let btn = document.querySelector('#navbar-toggle-btn')
  btn.addEventListener('click', function(e) {
    var expandableEl = document.querySelector('.' + style_to_expand);
    // abandon if nothing found
    if (expandableEl == null) {
      return;
    }
    var isCollapsed = expandableEl.getAttribute('data-expanded') === 'false';

    if(isCollapsed) {
      expandEl(expandableEl)
      expandableEl.setAttribute('data-expanded', 'true')
    } else {
      collapseEl(expandableEl)
    }
  });

}); // end domloaded


