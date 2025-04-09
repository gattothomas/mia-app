{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const CACHE_NAME = 'my-cache-v1';\
const urlsToCache = [\
  '/',\
  '/index.html',\
  '/manifest.json',\
  '/icon.png',\
  '/icon-512.png',\
];\
\
// Quando il service worker si installa\
self.addEventListener('install', (event) => \{\
  event.waitUntil(\
    caches.open(CACHE_NAME)\
      .then((cache) => \{\
        return cache.addAll(urlsToCache);\
      \})\
  );\
\});\
\
// Quando il service worker \'e8 attivo\
self.addEventListener('activate', (event) => \{\
  const cacheWhitelist = [CACHE_NAME];\
  event.waitUntil(\
    caches.keys().then((cacheNames) => \{\
      return Promise.all(\
        cacheNames.map((cacheName) => \{\
          if (!cacheWhitelist.includes(cacheName)) \{\
            return caches.delete(cacheName);\
          \}\
        \})\
      );\
    \})\
  );\
\});\
\
// Servire le risorse dalla cache\
self.addEventListener('fetch', (event) => \{\
  event.respondWith(\
    caches.match(event.request)\
      .then((cachedResponse) => \{\
        if (cachedResponse) \{\
          return cachedResponse;\
        \}\
        return fetch(event.request);\
      \})\
  );\
\});\
}