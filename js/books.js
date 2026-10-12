'use strict';
const domains={nl:'amazon.nl',com:'amazon.com',uk:'amazon.co.uk',de:'amazon.de',in:'amazon.in',se:'amazon.se'};
document.getElementById('marketplace').addEventListener('change',event=>{
  const domain=domains[event.target.value]||domains.nl;
  document.querySelectorAll('.amazon-link').forEach(link=>link.href=`https://www.${domain}/dp/${link.dataset.asin}`);
});
const content={
  excerpt:{label:'AN EXCERPT / PROLOGUE',title:'Two Ways of Looking at the Sky',paragraphs:[
    'The Sun does not vanish all at once.',
    'A small darkness appears at one edge, almost too slight to notice. It grows. The familiar disc becomes a crescent; the light thins; shadows sharpen. If the eclipse is total, day briefly loses its confidence. Birds may settle. People who know perfectly well what is happening still look up with the unease that comes when the sky breaks one of its habits.',
    'The event can be predicted. Long before the first dark notch appears, an astronomer can state where the eclipse will be visible, when it will begin and how long it will last. The explanation is geometrical: the Sun, Earth and Moon have moved into a particular arrangement. No appetite in the heavens is required.',
    'There is another account. Rāhu, having disguised himself among the gods and stolen a taste of the nectar of immortality, is exposed by the Sun and Moon. Viṣṇu severs his head, but too late. The head is immortal. It pursues its accusers and periodically swallows them; because it has no body, they emerge again.',
    'These explanations do not do the same work. One identifies a physical mechanism and permits calculation. The other places a frightening interruption within a story of deception, punishment and revenge. It is tempting to arrange them as a simple historical contest: myth retreats, reason advances. The record is less obliging.'
  ]},
  wonder:{label:'01 / THE INHERITANCE',title:'Admiration without exaggeration',paragraphs:[
    'An ancient text need not anticipate a modern discovery to deserve our attention. A calculation, philosophical dispute or creation hymn can be remarkable on its own terms.',
    'The book asks how we can recognise intellectual achievement while keeping claims about dates, transmission and scientific equivalence attached to evidence. It also asks what is lost when dismissal and extravagant praise become the only available responses.'
  ]},
  geometry:{label:'02 / THE CALCULATION',title:'Precision on the offering ground',paragraphs:[
    'A ritual requirement can become a mathematical problem: how do you change the shape of an altar while preserving its area?',
    'The book examines geometry through the practical demands placed on ritual specialists. The interesting question is what kind of precision was needed, how procedures worked and what their religious setting tells us about their purpose.'
  ]},
  cern:{label:'03 / THE METAPHOR',title:'A god at the laboratory gate',paragraphs:[
    'An image of Shiva beside a particle-physics laboratory invites a powerful comparison. The book pauses over that invitation: what does the image illuminate, and what cannot follow from it?',
    'Metaphor can be suggestive without becoming a scientific explanation. This chapter considers why ancient–modern parallels appeal to us, and how to appreciate them while asking which claims can actually be tested.'
  ]},
  translation:{label:'04 / THE ENCOUNTER',title:'When knowledge changes language',paragraphs:[
    'An idea does not travel unchanged simply because a translator finds equivalent words. Patronage, institutions, intended readers and decisions about meaning enter the journey.',
    'Through encounters between Sanskrit and Persian, the book asks what translation keeps, what it changes and who gets to decide which explanation will carry authority.'
  ]},
  privacy:{label:'PRIVACY & PURCHASING',title:'A straightforward reader experience',paragraphs:[
    'This page does not ask you to create an account or enter payment details. No advertising trackers, analytics scripts or newsletter forms have been added to this page. The hosting service may process ordinary access logs.',
    'Retailer links take you to external websites. Their privacy notices, prices, payment arrangements and order-support policies apply to purchases made there.',
    'Direct digital sales are not active yet. If a digital shop is added, its checkout will explain the product, payment and delivery arrangements. Please check the destination and purchase details before paying.'
  ]}
};
const dialog=document.getElementById('reader'),reader=document.getElementById('reader-content');let opener=null;
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>{
  const data=content[button.dataset.open];if(!data)return;
  opener=button;reader.replaceChildren();
  const label=document.createElement('p');label.className='eyebrow';label.textContent=data.label;
  const heading=document.createElement('h2');heading.id='reader-title';heading.textContent=data.title;
  reader.append(label,heading);data.paragraphs.forEach(text=>{const p=document.createElement('p');p.textContent=text;reader.append(p);});
  if(button.dataset.open!=='privacy'){const link=document.createElement('a');link.className='button dark';link.href='#books';link.textContent='Find your edition →';link.addEventListener('click',()=>dialog.close());reader.append(link);}
  dialog.setAttribute('aria-labelledby','reader-title');dialog.showModal();document.body.classList.add('modal-open');
}));
document.getElementById('close-reader').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(opener)opener.focus();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
function safeUrl(value,hosts){try{const u=new URL(value);return u.protocol==='https:'&&hosts.some(host=>u.hostname===host||u.hostname.endsWith('.'+host))?u.href:null;}catch{return null;}}
const settings=window.AUTHOR_SHOP||{},lulu=safeUrl(settings.luluThesisUrl,['lulu.com']);
if(lulu){const link=document.getElementById('lulu-featured');link.href=lulu;link.hidden=false;}
const shop=safeUrl(settings.digitalShopUrl,['payhip.com']);
if(settings.digitalShopLive&&shop){const panel=document.getElementById('direct-panel');panel.replaceChildren();const stamp=document.createElement('span');stamp.className='small-stamp';stamp.textContent='DIRECT FROM THE AUTHOR';const title=document.createElement('h3');title.textContent='Ebooks & downloadable work';const p=document.createElement('p');p.textContent='Explore available digital products. File formats, prices and delivery details are shown in the shop before checkout.';const a=document.createElement('a');a.href=shop;a.className='button dark';a.textContent='Browse the digital shop ↗';a.target='_blank';a.rel='noopener noreferrer';panel.append(stamp,title,p,a);}
document.getElementById('year').textContent=new Date().getFullYear();

// Motion is progressive enhancement: content is visible before and without JS.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll('.hero-copy > *, .hero-art, .section-heading, .featured-title, .featured-detail, .other-book, .ideas-head, .idea, .direct > div, .about-grid > *, .faq > div');
  const played = new WeakSet();
  const active = new Map();
  let observer = null;

  function reveal(element) {
    if (preference.matches || played.has(element) || typeof element.animate !== 'function') return;
    played.add(element);
    const siblings = [...element.parentElement.children];
    const delay = Math.min(siblings.indexOf(element), 3) * 60;
    const animation = element.animate([
      { opacity: 0, transform: 'translateY(12px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 620, delay, fill: 'backwards', easing: 'cubic-bezier(.22,.61,.36,1)' });
    active.set(element, animation);
    animation.onfinish = () => active.delete(element);
    animation.oncancel = () => active.delete(element);
  }

  function configureMotion() {
    observer?.disconnect();
    document.documentElement.classList.toggle('motion-enabled', !preference.matches);
    if (preference.matches) {
      active.forEach(animation => animation.cancel());
      active.clear();
      return;
    }
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    targets.forEach(element => {
      if (!played.has(element)) observer.observe(element);
    });
  }

  // Keyboard users should always see the control they have focused.
  document.addEventListener('focusin', event => {
    active.forEach((animation, element) => {
      if (element.contains(event.target)) animation.cancel();
    });
  });
  if (typeof preference.addEventListener === 'function') preference.addEventListener('change', configureMotion);
  else if (typeof preference.addListener === 'function') preference.addListener(configureMotion);
  configureMotion();
})();
