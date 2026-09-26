
(function(){
  const KEY='zkwfm_cookie_preferences_v1';
  const defaults={necessary:true,analytics:false,marketing:false,timestamp:null};
  function load(){try{return Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch(e){return Object.assign({},defaults);}}
  function save(p){p.necessary=true;p.timestamp=new Date().toISOString();try{localStorage.setItem(KEY,JSON.stringify(p));}catch(e){}window.ZKConsent.preferences=p;document.dispatchEvent(new CustomEvent('zkconsentchange',{detail:p}));}
  window.ZKConsent={preferences:load(),has:function(c){return !!this.preferences[c];},open:function(){openModal();}};
  function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;}
  let banner,modal,a,m;
  function closeBanner(){banner.classList.remove('show');}
  function openModal(){const p=load();a.checked=!!p.analytics;m.checked=!!p.marketing;modal.classList.add('show');}
  function closeModal(){modal.classList.remove('show');}
  function init(){
    banner=el('div','zk-consent-banner');
    banner.innerHTML='<div class="zk-consent-inner"><div class="zk-consent-copy"><strong>Your privacy choices</strong><p>We use necessary technologies to operate this website. With your permission, we may also use analytics or marketing technologies. You can accept, reject non-essential technologies, or manage your preferences. <a href="/cookie-policy">Cookie Policy</a></p><div class="zk-consent-actions"></div></div></div>';
    const actions=banner.querySelector('.zk-consent-actions');
    const reject=el('button','zk-consent-reject','Reject Non-Essential');const manage=el('button','zk-consent-manage','Manage Preferences');const accept=el('button','zk-consent-accept','Accept All');
    actions.append(reject,manage,accept);document.body.appendChild(banner);
    modal=el('div','zk-consent-modal');modal.innerHTML='<div class="zk-consent-panel" role="dialog" aria-modal="true" aria-labelledby="zk-consent-title"><h2 id="zk-consent-title">Privacy Preferences</h2><p>Choose which optional technologies may be used. Necessary technologies are always enabled because they support core site functions and preference storage.</p><div class="zk-consent-row"><div><strong>Necessary</strong><small>Required for core website functions and to remember your privacy choices.</small></div><label class="zk-toggle"><input type="checkbox" checked disabled><span class="zk-slider"></span></label></div><div class="zk-consent-row"><div><strong>Analytics</strong><small>Helps understand aggregate site usage and improve content, when analytics tools are enabled.</small></div><label class="zk-toggle"><input id="zk-analytics" type="checkbox"><span class="zk-slider"></span></label></div><div class="zk-consent-row"><div><strong>Marketing</strong><small>Supports campaign measurement or advertising technologies, when enabled.</small></div><label class="zk-toggle"><input id="zk-marketing" type="checkbox"><span class="zk-slider"></span></label></div><div class="zk-consent-footer"><button class="zk-close">Cancel</button><button class="zk-save">Save Preferences</button></div></div>';
    document.body.appendChild(modal);a=modal.querySelector('#zk-analytics');m=modal.querySelector('#zk-marketing');
    reject.onclick=()=>{save({necessary:true,analytics:false,marketing:false});closeBanner();};
    accept.onclick=()=>{save({necessary:true,analytics:true,marketing:true});closeBanner();};manage.onclick=openModal;
    modal.querySelector('.zk-close').onclick=closeModal;modal.querySelector('.zk-save').onclick=()=>{save({necessary:true,analytics:a.checked,marketing:m.checked});closeModal();closeBanner();};
    modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
    document.querySelectorAll('[data-cookie-settings]').forEach(x=>x.addEventListener('click',e=>{e.preventDefault();openModal();}));
    let hasChoice=false;try{hasChoice=!!localStorage.getItem(KEY);}catch(e){}if(!hasChoice)banner.classList.add('show');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  document.querySelectorAll('.zk-drop-menu').forEach((menu)=>{
    const links=[...menu.querySelectorAll('a')];
    const thoughtLeadership=links.find((link)=>link.textContent.trim()==='Thought Leadership');
    const isResourcesMenu=thoughtLeadership||links.some((link)=>/Resource Hub|Product Collaterals/.test(link.textContent));
    if(!isResourcesMenu)return;
    links.filter((link)=>/^(Security & Trust|Legal & Privacy|Privacy & Policy)$/.test(link.textContent.trim())).forEach((link)=>link.remove());
    const privacyLink=document.createElement('a');
    privacyLink.href='legal-privacy';
    privacyLink.textContent='Legal & Privacy';
    if(thoughtLeadership)thoughtLeadership.after(privacyLink);else menu.append(privacyLink);
  });
})();

/* Give legacy pages the same primary navigation as component-based pages. */
(()=>{
  document.querySelectorAll('.zk-global-header .zk-menu').forEach(nav=>{
    nav.innerHTML=`
      <a href="/workday">Workday Solution</a>
      <a href="/software-partners">Software Partners</a>
      <div class="zk-drop"><a data-nav-trigger="products" href="/ultima-series">Products</a><div class="zk-drop-menu"><a href="/ultima-series">Ultima Series</a><a href="/timetrack">TimeTrack</a><a href="/cirrusconnect">CirrusConnect</a></div></div>
      <a href="/why-zkteco-wfm">Why ZKTeco WFM</a>
      <div class="zk-drop"><a data-nav-trigger="resources" href="/resource-hub">Resource Hub</a><div class="zk-drop-menu"><a href="/product-collaterals">Product Collaterals</a><a href="/thought-leadership">Thought Leadership</a><a href="/legal-privacy">Legal &amp; Privacy</a></div></div>
      <a href="/events">Events</a><a href="/support">Support</a><a class="zk-talk" href="/contact">Talk to an Expert</a>`;
  });
})();

/* Mobile navigation: keep the compact header usable with tap-to-expand menus. */
(()=>{
  const enhance=()=>{
    const header=document.querySelector('.zk-global-header');
    const nav=header?.querySelector('.zk-menu');
    const brand=header?.querySelector('.zk-brand');
    if(!header||!nav||!brand||header.querySelector('.zk-mobile-menu-toggle'))return;
    const toggle=document.createElement('button');
    toggle.type='button';toggle.className='zk-mobile-menu-toggle';toggle.setAttribute('aria-label','Open navigation menu');toggle.setAttribute('aria-expanded','false');toggle.innerHTML='<span></span><span></span><span></span>';
    brand.after(toggle);
    toggle.addEventListener('click',()=>{const open=header.classList.toggle('zk-mobile-menu-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');});
    nav.querySelectorAll('.zk-drop').forEach(drop=>{
      const link=drop.querySelector(':scope > a');const menu=drop.querySelector(':scope > .zk-drop-menu');
      if(!link||!menu)return;
      const expand=document.createElement('button');expand.type='button';expand.className='zk-mobile-submenu-toggle';expand.setAttribute('aria-label','Show '+link.textContent.trim()+' menu');expand.setAttribute('aria-expanded','false');expand.innerHTML='<span aria-hidden="true"></span>';link.after(expand);
      expand.addEventListener('click',()=>{const open=drop.classList.toggle('zk-mobile-submenu-open');expand.setAttribute('aria-expanded',String(open));expand.setAttribute('aria-label',(open?'Hide ':'Show ')+link.textContent.trim()+' menu');});
    });
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);else enhance();
})();

/* Repair legacy mojibake in CTA labels without touching script or URL content. */
(()=>{
  const badRight=String.fromCharCode(0x00e2,0x2020,0x2019);
  const badLeft=String.fromCharCode(0x00e2,0x2020,0x0090);
  const badUp=String.fromCharCode(0x00e2,0x2020,0x2018);
  const badDown=String.fromCharCode(0x00e2,0x2020,0x201c);
  const badBoth=String.fromCharCode(0x00e2,0x2020,0x201d);
  const repairs=[
    [badRight,String.fromCharCode(0x2192)],[badLeft,String.fromCharCode(0x2190)],[badUp,String.fromCharCode(0x2191)],[badDown,String.fromCharCode(0x2193)],[badBoth,String.fromCharCode(0x2194)],
    [String.fromCharCode(0x00c2,0x00b7),String.fromCharCode(0x00b7)],
    [String.fromCharCode(0x00c2,0x00a9),String.fromCharCode(0x00a9)],
    [String.fromCharCode(0x00c2,0x00ae),String.fromCharCode(0x00ae)],
    [String.fromCharCode(0x00e2,0x20ac,0x201d),String.fromCharCode(0x2014)],
    [String.fromCharCode(0x00e2,0x20ac,0x201c),String.fromCharCode(0x2013)],
    [String.fromCharCode(0x00e2,0x20ac,0x2122),String.fromCharCode(0x2019)],
    [String.fromCharCode(0x00e2,0x20ac,0x0153),String.fromCharCode(0x201c)],
    [String.fromCharCode(0x00e2,0x20ac,0x009d),String.fromCharCode(0x201d)],
    [String.fromCharCode(0x00e2,0x0153,0x201c),String.fromCharCode(0x2713)]
  ];
  const repair=(root=document)=>{
    const walker=document.createTreeWalker(root.body||root,NodeFilter.SHOW_TEXT);
    let node;
    while(node=walker.nextNode()){
      if(node.parentElement?.closest('script,style,noscript,textarea'))continue;
      let value=node.nodeValue;
      repairs.forEach(([broken,correct])=>{value=value.split(broken).join(correct);});
      if(value!==node.nodeValue)node.nodeValue=value;
    }
  };
  const start=()=>{repair();new MutationObserver(()=>repair()).observe(document.body,{childList:true,subtree:true,characterData:true});};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();

/* The Contact-page headquarters CTA uses the shared, styled Zoho modal. */
(()=>{
  if(!/^\/contact\/?$/.test(location.pathname))return;
  document.addEventListener('click',(event)=>{
    const trigger=event.target.closest('.zk-section.alt .zk-actions .zk-btn.primary');
    if(!trigger)return;
    event.preventDefault();
    document.dispatchEvent(new CustomEvent('zoho:open',{detail:trigger}));
  });
})();

/* Add the supplied Google Maps location to the Contact-page headquarters card. */
(()=>{
  if(!/^\/contact\/?$/.test(location.pathname))return;
  const card=document.querySelector('.zk-section.alt .zk-card');
  if(!card||card.querySelector('.contact-hq-map'))return;
  const copy=document.createElement('div');
  copy.className='contact-hq-copy';
  while(card.firstChild)copy.append(card.firstChild);
  const contactButton=copy.querySelector('.zk-actions .zk-btn.primary');
  if(contactButton){
    contactButton.textContent='Contact Form';
    contactButton.style.setProperty('color','#201f62','important');
  }
  const map=document.createElement('div');
  map.className='contact-hq-map';
  map.innerHTML='<iframe title="Map showing ZKTeco WFM headquarters in Tampa, Florida" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=27.984623%2C-82.549549&amp;z=17&amp;output=embed"></iframe>';
  const link=document.createElement('a');
  link.className='contact-hq-map-link';
  link.href='https://maps.app.goo.gl/Yq5XRWizXGR9YEsw6';
  link.target='_blank';
  link.rel='noopener noreferrer';
  link.textContent='Open in Google Maps →';
  map.append(link);
  const layout=document.createElement('div');
  layout.className='contact-hq-layout';
  layout.append(copy,map);
  card.append(layout);
})();

/* Standardize local-page bottom CTAs and route them to the shared Home Zoho form. */
(()=>{
  const labels={
    index:'Find Your Solution', workday:'Request a Demo', 'use-cases':'Find Your Solution',
    'customer-stories':"Let's Talk", 'ultima-series':'Find Your Ultima', timetrack:'Request a Demo',
    'why-zkteco-wfm':"Let's Talk",
    'thought-leadership':"Let's Talk",
    support:'Get Support'
  };
  const page=(location.pathname.split('/').filter(Boolean).pop()||'index').replace(/\.html$/,'');
  document.body.classList.add('zk-page-'+page);
  if(page==='cirrusconnect'){
    document.querySelector('#platform')?.remove();
    document.querySelector('.cc-partner-arch')?.closest('section')?.remove();
    const platformLabel=document.querySelector('.cc-dataflow .cc-node:last-child h3');
    if(platformLabel)platformLabel.textContent='HCM / WFM Platform';
    const flow=document.querySelector('.cc-flow-tag');
    if(flow)flow.innerHTML='ULTIMA <em>↔</em> CIRRUSCONNECT <em>↔</em> YOUR PLATFORM';
  }
  if(page==='resources'){
    document.querySelectorAll('.zk-card p a').forEach(link=>{
      if(link.querySelector('span'))return;
      const match=link.textContent.trim().match(/^(.*?)(→)$/);
      if(!match)return;
      const arrow=document.createElement('span');
      arrow.setAttribute('aria-hidden','true');
      arrow.textContent=match[2];
      link.replaceChildren(document.createTextNode(match[1].trim()+' '),arrow);
    });
    document.querySelectorAll('.zk-card').forEach(card=>{
      const link=card.querySelector('p a[href]');
      if(!link)return;
      card.tabIndex=0;
      card.setAttribute('role','link');
      const open=()=>{location.href=link.href;};
      card.addEventListener('click',event=>{if(!event.target.closest('a'))open();});
      card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
    });
  }
  const zohoCtas={
    'software-partners':'.sp85-final .sp85-btn-primary',
    'why-zkteco-wfm':'.brand-close .btn.primary',
    'thought-leadership':'.close .btn',
    events:'.ev-final .ev-btn.primary',
    support:'main > section:last-of-type .btn.primary'
  };
  const zohoCta=zohoCtas[page];
  if(zohoCta)document.addEventListener('click',(event)=>{const target=event.target.closest(zohoCta);if(!target)return;event.preventDefault();event.stopImmediatePropagation();document.dispatchEvent(new CustomEvent('zoho:open',{detail:target}));},true);
  const label=labels[page];
  if(!label)return;
  let scope=document.querySelector('.cta-section,.tt-final,.brand-close,.cc-final,.sp85-final,.close,.final-cta,body.zk-page-support main>section:last-of-type');
  if(!scope){
    scope=document.createElement('section');
    scope.className='zk-global-bottom-cta';
    scope.innerHTML='<div class="zk-global-bottom-cta__inner"><a class="zk-standard-bottom-cta" href="/?openZohoForm=1#contact" aria-label="Talk to an Expert">Talk to an Expert</a></div>';
    (document.querySelector('.zk-global-footer,footer')||document.body).before(scope);
  }
  if(page==='thought-leadership'){
    const description=scope.querySelector('p');
    if(description)description.innerHTML='ZKTeco WFM can evaluate your environment and recommend<br>an appropriate technology and integration approach.';
    const headline=scope.querySelector('h2');
    if(headline&&!scope.querySelector('.zk-cta-eyebrow')){
      const eyebrow=document.createElement('div');
      eyebrow.className='eyebrow zk-cta-eyebrow';
      eyebrow.textContent='THOUGHT LEADERSHIP';
      headline.before(eyebrow);
    }
  }
  const actions=[...scope.querySelectorAll('a.btn,a.zk-btn,a.tt-btn,button.final-cta-button')];
  const primary=actions.find(el=>!el.classList.contains('secondary')&&!el.classList.contains('outline-light'))||actions[0];
  if(!primary)return;
  actions.forEach(el=>{if(el!==primary)el.remove();});
  primary.textContent=label;
  const arrow=document.createElement('span');
  arrow.setAttribute('aria-hidden','true');
  arrow.textContent='→';
  arrow.textContent=String.fromCharCode(0x2192);
  primary.append(arrow);
  primary.classList.add('zk-standard-bottom-cta');
  if(primary.tagName==='A')primary.href='/?openZohoForm=1#contact';
  else primary.setAttribute('data-zoho-form-open','');
})();

/* Use the Resource Hub footer as the shared footer on every page. */
(()=>{
  const standardizeFooter=()=>{
    const footer=document.querySelector('.zk-global-footer');
    if(!footer||footer.dataset.standardizedFooter)return;
    if(!document.getElementById('zk-standard-footer-style')){
      const style=document.createElement('style');
      style.id='zk-standard-footer-style';
      style.textContent='.zk-global-footer .zk-footer-col h4{margin-bottom:18px}.zk-global-footer .zk-footer-col a,.zk-global-footer .zk-footer-col .zk-link-disabled{margin-block:12px}';
      document.head.append(style);
    }
    footer.dataset.standardizedFooter='true';
    footer.innerHTML=`
      <div class="zk-footer-shell">
        <div class="zk-footer-grid">
          <div class="zk-footer-brand"><img alt="ZKTeco WFM" class="zk-footer-logo" src="/assets/ZKTecowfm-white-green@4x.png" width="180"><p>The Workforce Data Collection Company.<br>Every Punch Matters.</p></div>
          <div class="zk-footer-col"><h4>Solutions</h4><a href="/workday">Workday Customers</a><a href="/software-partners">Software Partners</a><a href="/use-cases">Industry Use Cases</a><a href="/customer-stories">Customer Stories</a></div>
          <div class="zk-footer-col"><h4>Products</h4><a href="/ultima-series">Ultima Series</a><a href="/timetrack">TimeTrack</a><a href="/cirrusconnect">CirrusConnect</a><a href="/workday#cirrusdcs">CirrusDCS</a></div>
          <div class="zk-footer-col"><h4>Resources</h4><a href="/resource-hub">Resources</a><a href="/product-collaterals">Product Collaterals</a><a href="/thought-leadership">Thought Leadership</a><a href="/legal-privacy">Legal &amp; Privacy</a><a href="/security-trust">Security &amp; Trust</a></div>
          <div class="zk-footer-col"><h4>Company</h4><a href="/why-zkteco-wfm">Why ZKTeco WFM</a><a href="/contact">Contact</a><a href="https://zktecowfm.com/careers/">Careers</a><a href="/events">Events</a><a href="/support">Support</a></div>
        </div>
        <div class="zk-footer-bottom"><span>© 2026 ZKTeco WFM. All rights reserved.</span><div class="zk-footer-legal"><a href="/privacy">Privacy &amp; GDPR</a><a href="/cookie-policy">Cookies</a><button type="button" data-cookie-settings>Cookie Preferences</button><a href="/terms">Terms</a><a href="/accessibility">Accessibility</a><a href="/educational-disclaimer">Educational Disclaimer</a></div></div>
      </div>`;
    footer.querySelector('[data-cookie-settings]')?.addEventListener('click',()=>window.ZKConsent?.open());
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',standardizeFooter);else standardizeFooter();
})();

