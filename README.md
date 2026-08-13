# Beloti Advocacia — Landing Page

Landing page de captação de leads para mandado de segurança por vaga em creche municipal.  
Stack: **HTML + CSS + JavaScript vanilla** — sem build, sem dependências locais.

---

## Estrutura do projeto

```
/
├── index.html          ← página principal
├── css/
│   └── styles.css      ← todo o CSS (design system, componentes, responsividade)
├── js/
│   └── main.js         ← formulário, validação, redirect WhatsApp, animações
├── assets/
│   ├── logo.png        ← logo da Dra. Bruna (fornecer: fundo transparente, ~120×40px)
│   ├── bruna-hero.jpg  ← foto principal (fornecer: ~480×560px, JPEG <200KB)
│   ├── bruna-autoridade.jpg ← foto secundária (fornecer: ~400×480px, JPEG <200KB)
│   ├── og-bruna.jpg    ← imagem Open Graph (fornecer: 1200×630px, JPEG)
│   └── favicon.ico     ← favicon (monograma BI, 32×32px)
└── README.md
```

---

## Pendências antes de ir ao ar

Abrir `index.html` e substituir os valores abaixo:

| O que substituir | Onde encontrar no arquivo |
|---|---|
| `SEU_PIXEL_ID_AQUI` (2×) | `<head>` — snippet do Meta Pixel |
| `5541999999999` | `js/main.js` linha com `WHATSAPP_NUMBER` |
| `SEU_INSTAGRAM` | `<footer>` — link do Instagram |
| Fotos placeholder `<div class="photo-placeholder">` | Substituir pelo `<img>` real nas seções Hero e Autoridade |
| Logo placeholder `<span class="logo-placeholder">` | Substituir por `<img src="assets/logo.png">` no header e footer |
| Depoimentos placeholder | Substituir pelos depoimentos reais dos clientes |
| Número de OAB | Confirmar com a Dra. Bruna e adicionar nos bullets de credenciais |

---

## Deploy no Hostgator (cPanel)

### Passo a passo

1. Acesse o cPanel da Hostgator:  
   - Via painel de cliente → ícone **cPanel**  
   - Ou direto: `seudominio.com.br/cpanel`

2. Abra o **Gerenciador de Arquivos** (File Manager).

3. Navegue até a pasta correta do seu domínio:
   - Domínio principal → pasta `public_html`
   - Addon domain / subdomínio → confirme em **cPanel → Addon Domains** qual subpasta está apontada

4. Faça **upload do conteúdo** da pasta do projeto — não a pasta em si, o que está dentro dela:
   - `index.html`
   - Pasta `css/`
   - Pasta `js/`
   - Pasta `assets/`

5. Certifique-se de que `index.html` ficou **na raiz** da pasta correta do domínio.

6. Acesse o domínio no browser — o site deve carregar imediatamente.  
   Nenhum build, terminal ou configuração de servidor são necessários.

### Via FTP (alternativa)

1. No cPanel, vá em **Contas FTP** e anote ou crie as credenciais.
2. Abra o FileZilla:  
   - Host: `ftp.seudominio.com.br`  
   - Usuário / Senha: credenciais do cPanel  
   - Porta: `21`
3. Suba os arquivos na mesma estrutura descrita acima.

---

## Personalização rápida

### Trocar cor primária

No `css/styles.css`, linha com `--copper`:
```css
--copper: #B87551;  /* ← troque aqui */
```

### Trocar número de WhatsApp

Em `js/main.js`:
```js
var WHATSAPP_NUMBER = '5541999999999'; // ← número com DDI, só dígitos
```

### Adicionar Pixel do Meta

No `index.html`, substitua ambas as ocorrências de `SEU_PIXEL_ID_AQUI` pelo ID real fornecido pelo Meta Ads Manager.

### Adicionar fotos reais

Substitua os blocos `<div class="photo-placeholder">` pelas tags `<img>` correspondentes:

```html
<!-- Hero -->
<img
  src="assets/bruna-hero.jpg"
  alt="Dra. Bruna Beloti, advogada de direito de família em Curitiba"
  width="480"
  height="560"
/>

<!-- Autoridade -->
<img
  src="assets/bruna-autoridade.jpg"
  alt="Dra. Bruna Beloti"
  width="400"
  height="480"
  loading="lazy"
/>
```

---

## Requisitos de imagem

| Arquivo | Dimensão ideal | Formato | Tamanho máximo |
|---|---|---|---|
| `bruna-hero.jpg` | 480 × 560 px | JPEG | 150 KB |
| `bruna-autoridade.jpg` | 400 × 480 px | JPEG | 150 KB |
| `og-bruna.jpg` | 1200 × 630 px | JPEG | 200 KB |
| `logo.png` | 240 × 80 px | PNG (transparente) | 30 KB |
| `favicon.ico` | 32 × 32 px | ICO | 5 KB |

Ferramentas gratuitas de compressão: [squoosh.app](https://squoosh.app) ou [tinypng.com](https://tinypng.com).

---

## Acessibilidade

- Contraste mínimo AA em todos os textos sobre fundo claro e escuro.
- Foco visível em todos os campos e botões (anel laranja/cobre).
- Carrossel pausa automaticamente com `prefers-reduced-motion: reduce` — cards ficam em grade estática.
- Campos do formulário com `aria-required`, `aria-describedby` para erros e `role="alert"` nas mensagens de erro.

---

## SEO

- `<title>` e `<meta name="description">` configurados.
- Open Graph completo (`og:title`, `og:description`, `og:image`).
- Fontes carregadas com `preconnect` para performance.
- Imagens fora da dobra inicial têm `loading="lazy"`.
