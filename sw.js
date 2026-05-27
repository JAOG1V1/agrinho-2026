/* ============================================
   SERVICE WORKER - AGRO FORTE | AGRINHO 2026
   Permite que o site funcione offline
   após a primeira visita
   ============================================ */

'use strict';

// Nome da versão do cache (mudar para invalidar cache antigo)
// v2 — atualizado para incluir as 8 fontes self-hosted (regulamento retificado)
const NOME_CACHE = 'agro-forte-v2';

// Lista de recursos para guardar no cache (todo o site)
const RECURSOS_PARA_CACHE = [
    './',
    './index.html',
    './sobre.html',
    './praticas.html',
    './simulador.html',
    './quiz.html',
    './jogo.html',
    './glossario.html',
    './contato.html',
    './404.html',
    './css/style.css',
    './js/script.js',
    './manifest.json',
    './og-image.svg',
    './favicon.svg',
    // Fontes self-hosted (Playfair Display + Poppins) — conformidade com regulamento retificado
    './fonts/playfair-display-v40-latin_latin-ext-600.woff2',
    './fonts/playfair-display-v40-latin_latin-ext-700.woff2',
    './fonts/playfair-display-v40-latin_latin-ext-800.woff2',
    './fonts/poppins-v24-latin_latin-ext-300.woff2',
    './fonts/poppins-v24-latin_latin-ext-regular.woff2',
    './fonts/poppins-v24-latin_latin-ext-500.woff2',
    './fonts/poppins-v24-latin_latin-ext-600.woff2',
    './fonts/poppins-v24-latin_latin-ext-700.woff2'
];

// EVENTO INSTALL: dispara quando o SW é instalado pela primeira vez
self.addEventListener('install', function(evento) {
    console.log('[Service Worker] Instalando...');

    evento.waitUntil(
        caches.open(NOME_CACHE).then(function(cache) {
            console.log('[Service Worker] Adicionando recursos ao cache');
            // Adiciona os recursos, ignorando individualmente os que falharem
            return Promise.all(
                RECURSOS_PARA_CACHE.map(function(recurso) {
                    return cache.add(recurso).catch(function(erro) {
                        console.log('[Service Worker] Falha ao adicionar:', recurso, erro);
                    });
                })
            );
        }).then(function() {
            // Ativa o novo Service Worker imediatamente
            return self.skipWaiting();
        })
    );
});

// EVENTO ACTIVATE: dispara quando o SW é ativado
// Aproveita para limpar caches antigos de versões anteriores
self.addEventListener('activate', function(evento) {
    console.log('[Service Worker] Ativando...');

    evento.waitUntil(
        caches.keys().then(function(nomesCaches) {
            return Promise.all(
                nomesCaches.map(function(nome) {
                    if (nome !== NOME_CACHE) {
                        console.log('[Service Worker] Removendo cache antigo:', nome);
                        return caches.delete(nome);
                    }
                })
            );
        }).then(function() {
            // Toma controle de todas as abas abertas imediatamente
            return self.clients.claim();
        })
    );
});

// EVENTO FETCH: dispara em toda requisição da página
// Estratégia: Cache First (cache primeiro, rede como fallback)
self.addEventListener('fetch', function(evento) {
    // Ignora requisições que não são GET (POST, etc.)
    if (evento.request.method !== 'GET') {
        return;
    }

    // Ignora requisições de outros domínios (analytics, fontes externas, etc.)
    const url = new URL(evento.request.url);
    if (url.origin !== location.origin) {
        return;
    }

    evento.respondWith(
        caches.match(evento.request).then(function(respostaCache) {
            // Se encontrou no cache, devolve direto
            if (respostaCache) {
                return respostaCache;
            }

            // Se não, busca na rede e adiciona ao cache para próximas vezes
            return fetch(evento.request).then(function(respostaRede) {
                // Verifica se a resposta é válida
                if (!respostaRede || respostaRede.status !== 200 || respostaRede.type !== 'basic') {
                    return respostaRede;
                }

                // Clona a resposta para guardar no cache
                const respostaClone = respostaRede.clone();

                caches.open(NOME_CACHE).then(function(cache) {
                    cache.put(evento.request, respostaClone);
                });

                return respostaRede;
            }).catch(function() {
                // Se a rede falhou (offline) e não tem no cache,
                // tenta retornar a página 404 personalizada
                if (evento.request.destination === 'document') {
                    return caches.match('./404.html');
                }
            });
        })
    );
});
