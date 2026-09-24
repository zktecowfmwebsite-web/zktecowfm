
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
    banner.innerHTML='<div class="zk-consent-inner"><div class="zk-consent-copy"><strong>Your privacy choices</strong><p>We use necessary technologies to operate this website. With your permission, we may also use analytics or marketing technologies. You can accept, reject non-essential technologies, or manage your preferences. <a href="'+(location.pathname.includes('/insights/')?'../cookie-policy.html':'cookie-policy.html')+'">Cookie Policy</a></p><div class="zk-consent-actions"></div></div></div>';
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
})();

/* Standardize local-page bottom CTAs and route them to the shared Home Zoho form. */
(()=>{
  const labels={
    index:'Find Your Solution', workday:'Request a Demo', 'software-partners':'Explore Partnership', 'use-cases':'Find Your Solution',
    'customer-stories':"Let's Talk", 'ultima-series':'Find Your Ultima', timetrack:'Request a Demo',
    cirrusconnect:'Request a Demo', 'why-zkteco-wfm':"Let's Talk", 'manufacturing-facilities':'Explore Solutions',
    resources:'Ask an Expert', 'thought-leadership':"Let's Talk", 'security-trust':'Talk Security',
    support:'Get Support', contact:"Let's Talk"
  };
  const page=location.pathname.split('/').filter(Boolean).pop()||'index';
  const label=labels[page];
  if(!label)return;
  let scope=document.querySelector('.cta-section,.tt-final,.brand-close,.cc-final,.sp85-final,.close,.final-cta');
  if(!scope){
    scope=document.createElement('section');
    scope.className='zk-global-bottom-cta';
    scope.innerHTML='<div class="zk-global-bottom-cta__inner"><a class="zk-standard-bottom-cta" href="/?openZohoForm=1#contact"></a></div>';
    (document.querySelector('.zk-global-footer,footer')||document.body).before(scope);
  }
  const actions=[...scope.querySelectorAll('a.btn,a.zk-btn,a.tt-btn,button.final-cta-button')];
  const primary=actions.find(el=>!el.classList.contains('secondary')&&!el.classList.contains('outline-light'))||actions[0];
  if(!primary)return;
  actions.forEach(el=>{if(el!==primary)el.remove();});
  primary.textContent=label;
  const arrow=document.createElement('span');
  arrow.setAttribute('aria-hidden','true');
  arrow.textContent='→';
  primary.append(arrow);
  primary.classList.add('zk-standard-bottom-cta');
  if(primary.tagName==='A')primary.href='/?openZohoForm=1#contact';
  else primary.setAttribute('data-zoho-form-open','');
})();
