function sendContent(content) {
    fetch('https://example.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: content })
    });
  }
  
  let scrolling = false;
  
  document.addEventListener('scroll', () => {
    scrolling = true;
  });
  
  document.addEventListener('click', () => {
    if (!scrolling) return;
    
    const url = new URL(window.location.href);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
    
    const metadata = {
      url: url.href,
      title: document.title,
      excerpt: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      length: document.body.innerText.length,
    };
    
    const isArticle = (() => {
      // This function checks whether the current page is an article or not.
      // You can modify this function based on your requirements.
      const article = document.querySelector('article');
      if (article) return true;
      
      const wordCount = document.body.innerText.split(/\s+/g).length;
      const paragraphCount = document.querySelectorAll('p').length;
      const ratio = wordCount / paragraphCount;
      
      return wordCount > 400 && ratio > 5;
    })();
    
    if (!isArticle) return;
    
    const readability = new Readability(document.cloneNode(true)).parse();
    const content = readability.content;
    console.log(content)
    if (content) {
      sendContent(content);
    }
  });
  