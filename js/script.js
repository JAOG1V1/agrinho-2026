/* ============================================
   AGRINHO 2026 - JAVASCRIPT PRINCIPAL
   Tema: Agro forte, futuro sustentável
   Funcionalidades: tema escuro, menu mobile,
   animações, quiz, formulário, calculadora
   ============================================ */

'use strict';

/* ============================================
   1. ALTERNANCIA DE TEMA (CLARO/ESCURO)
   ============================================ */

// Função para inicializar o sistema de tema
function inicializarTema() {
    const botaoTema = document.getElementById('botaoTema');
    const iconeTema = document.getElementById('iconeTema');

    if (!botaoTema || !iconeTema) {
        return;
    }

    // Recupera tema salvo no navegador (ou usa claro como padrão)
    const temaSalvo = localStorage.getItem('agrinho-tema') || 'claro';
    aplicarTema(temaSalvo);

    // Evento ao clicar no botão de troca de tema
    botaoTema.addEventListener('click', function() {
        const temaAtual = document.body.classList.contains('tema-escuro') ? 'escuro' : 'claro';
        const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';
        aplicarTema(novoTema);
        localStorage.setItem('agrinho-tema', novoTema);
    });
}

// Função que aplica o tema na página
function aplicarTema(tema) {
    const iconeTema = document.getElementById('iconeTema');

    if (tema === 'escuro') {
        document.body.classList.add('tema-escuro');
        if (iconeTema) iconeTema.textContent = '☀️';
    } else {
        document.body.classList.remove('tema-escuro');
        if (iconeTema) iconeTema.textContent = '🌙';
    }
}

/* ============================================
   2. MENU MOBILE (HAMBURGUER)
   ============================================ */

function inicializarMenuMobile() {
    const botaoMenu = document.getElementById('menuMobile');
    const navLinks = document.getElementById('navLinks');

    if (!botaoMenu || !navLinks) {
        return;
    }

    botaoMenu.addEventListener('click', function() {
        botaoMenu.classList.toggle('ativo');
        navLinks.classList.toggle('ativo');
    });

    // Fecha o menu ao clicar em um link
    const links = navLinks.querySelectorAll('a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            botaoMenu.classList.remove('ativo');
            navLinks.classList.remove('ativo');
        });
    });
}

/* ============================================
   3. ANIMACOES DE ENTRADA AO ROLAR (SCROLL)
   ============================================ */

function inicializarAnimacoesScroll() {
    const elementosFade = document.querySelectorAll('.fade-in');

    if (elementosFade.length === 0) {
        return;
    }

    // Usa Intersection Observer para detectar quando elemento entra na tela
    const observador = new IntersectionObserver(function(entradas) {
        entradas.forEach(function(entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elementosFade.forEach(function(elemento) {
        observador.observe(elemento);
    });
}

/* ============================================
   4. CONTADOR ANIMADO DE ESTATISTICAS
   ============================================ */

function inicializarContadores() {
    const contadores = document.querySelectorAll('.contador');

    if (contadores.length === 0) {
        return;
    }

    const observadorContador = new IntersectionObserver(function(entradas) {
        entradas.forEach(function(entrada) {
            if (entrada.isIntersecting) {
                animarContador(entrada.target);
                observadorContador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.5 });

    contadores.forEach(function(contador) {
        observadorContador.observe(contador);
    });
}

// Animação que conta de 0 até o número final
function animarContador(elemento) {
    const card = elemento.closest('.card-estatistica');
    const numeroFinal = parseInt(card.dataset.numero, 10);
    const sufixo = card.dataset.sufixo || '';
    const duracao = 2000;
    const incremento = numeroFinal / (duracao / 16);
    let valorAtual = 0;

    const intervalo = setInterval(function() {
        valorAtual += incremento;

        if (valorAtual >= numeroFinal) {
            valorAtual = numeroFinal;
            clearInterval(intervalo);
        }

        elemento.textContent = Math.floor(valorAtual) + sufixo;
    }, 16);
}

/* ============================================
   5. BOTAO VOLTAR AO TOPO
   ============================================ */

function inicializarBotaoTopo() {
    const botaoTopo = document.getElementById('voltarTopo');

    if (!botaoTopo) {
        return;
    }

    // Mostra o botão quando o usuário rola a página
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            botaoTopo.classList.add('visivel');
        } else {
            botaoTopo.classList.remove('visivel');
        }
    });

    // Volta ao topo ao clicar
    botaoTopo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   6. QUIZ INTERATIVO
   ============================================ */

// Banco de perguntas do quiz sobre agro sustentável
const perguntasQuiz = [
    {
        pergunta: 'Qual prática agrícola ajuda a evitar a erosão do solo, mantendo restos de cultura sobre a terra?',
        opcoes: [
            'Queimada controlada',
            'Plantio direto',
            'Aração profunda',
            'Monocultura intensiva'
        ],
        correta: 1,
        explicacao: 'O plantio direto mantém os restos da cultura anterior sobre o solo, protegendo-o contra a chuva e o sol, reduzindo a erosão em até 90%.'
    },
    {
        pergunta: 'O que é a "rotação de culturas"?',
        opcoes: [
            'Plantar a mesma cultura várias vezes seguidas',
            'Mudar de fazenda a cada safra',
            'Alternar diferentes plantas na mesma área ao longo do tempo',
            'Plantar apenas no inverno'
        ],
        correta: 2,
        explicacao: 'Rotação de culturas é alternar diferentes plantas na mesma área, melhorando a fertilidade do solo e quebrando ciclos de pragas naturalmente.'
    },
    {
        pergunta: 'Qual fonte de energia renovável tem se popularizado nas propriedades rurais brasileiras?',
        opcoes: [
            'Energia solar fotovoltaica',
            'Energia nuclear',
            'Carvão mineral',
            'Diesel'
        ],
        correta: 0,
        explicacao: 'A energia solar fotovoltaica é uma das fontes renováveis mais usadas no campo, podendo reduzir custos com eletricidade em até 95%.'
    },
    {
        pergunta: 'O que é um Sistema Agroflorestal?',
        opcoes: [
            'Uma área de floresta intocada',
            'Combinação de árvores nativas com cultivos agrícolas e/ou pecuária',
            'Plantio de eucalipto em larga escala',
            'Reserva legal obrigatória'
        ],
        correta: 1,
        explicacao: 'O Sistema Agroflorestal une árvores nativas, cultivos e até criação de animais no mesmo espaço, recuperando áreas degradadas e gerando renda diversificada.'
    },
    {
        pergunta: 'Qual a função das matas ciliares (vegetação ao redor de rios)?',
        opcoes: [
            'Apenas decoração da paisagem',
            'Aumentar a colheita das margens',
            'Filtrar a água, evitar erosão e proteger nascentes',
            'Servir de abrigo para o gado'
        ],
        correta: 2,
        explicacao: 'As matas ciliares funcionam como filtro natural da água, evitam o assoreamento dos rios, protegem nascentes e abrigam a biodiversidade local.'
    },
    {
        pergunta: 'O que são bioinsumos?',
        opcoes: [
            'Adubos químicos importados',
            'Microrganismos benéficos que substituem fertilizantes e pesticidas químicos',
            'Sementes geneticamente modificadas',
            'Máquinas agrícolas elétricas'
        ],
        correta: 1,
        explicacao: 'Bioinsumos são produtos baseados em microrganismos como fungos e bactérias benéficas que substituem produtos químicos, fortalecendo as plantas naturalmente.'
    },
    {
        pergunta: 'O Código Florestal brasileiro exige a manutenção de qual área dentro das propriedades rurais?',
        opcoes: [
            'Apenas estradas',
            'Reserva Legal e Áreas de Preservação Permanente',
            'Área para criação de gado exclusivamente',
            'Estacionamento de máquinas'
        ],
        correta: 1,
        explicacao: 'O Código Florestal exige que cada propriedade mantenha uma porcentagem com vegetação nativa preservada (Reserva Legal) e proteja matas ciliares e topos de morro (APPs).'
    },
    {
        pergunta: 'Qual prática permite economizar até 40% no consumo de água nas lavouras?',
        opcoes: [
            'Irrigação por inundação',
            'Plantio em áreas planas',
            'Irrigação inteligente com sensores',
            'Plantio noturno'
        ],
        correta: 2,
        explicacao: 'A irrigação inteligente usa sensores no solo para medir a umidade real e só liga quando necessário, economizando até 40% de água sem perder produtividade.'
    },
    {
        pergunta: 'Por que as abelhas são importantes para a agricultura sustentável?',
        opcoes: [
            'Apenas para produção de mel',
            'Para combater pragas',
            'Para polinizar lavouras e aumentar a produtividade',
            'Para alimentar o gado'
        ],
        correta: 2,
        explicacao: 'As abelhas e outros polinizadores são essenciais: aumentam a produtividade de muitas culturas como café, soja e frutas, além de produzirem mel como renda extra.'
    },
    {
        pergunta: 'O que é a Integração Lavoura-Pecuária-Floresta (ILPF)?',
        opcoes: [
            'Sistema que combina cultivo, criação de animais e árvores na mesma área',
            'Separação total entre lavoura e pecuária',
            'Apenas plantio de soja',
            'Reserva ambiental sem produção'
        ],
        correta: 0,
        explicacao: 'A ILPF combina lavoura, pecuária e árvores no mesmo espaço, otimizando o uso da terra, recuperando solos e diversificando a produção sem desmatar.'
    },
    {
        pergunta: 'O que significa "sequestro de carbono" no contexto do agro sustentável?',
        opcoes: [
            'Armazenar combustível para os tratores',
            'Capturar CO2 da atmosfera pelo solo, plantas e árvores',
            'Prender invasores em propriedades rurais',
            'Comprar créditos de carbono no exterior'
        ],
        correta: 1,
        explicacao: 'O sequestro de carbono é o processo natural de captura do CO2 atmosférico pelo solo, plantas e árvores, ajudando a combater as mudanças climáticas.'
    },
    {
        pergunta: 'Qual é a porcentagem aproximada do território brasileiro que ainda mantém vegetação nativa preservada?',
        opcoes: [
            'Cerca de 15%',
            'Cerca de 30%',
            'Cerca de 66%',
            'Cerca de 90%'
        ],
        correta: 2,
        explicacao: 'O Brasil preserva cerca de 66% de seu território com vegetação nativa — uma das maiores proporções entre países produtores de alimentos.'
    },
    {
        pergunta: 'Por que o Cerrado é chamado de "berço das águas" do Brasil?',
        opcoes: [
            'Por ter muitas piscinas naturais',
            'Por abrigar nascentes das principais bacias hidrográficas',
            'Por ter o maior volume de chuvas do país',
            'Por estar perto do oceano'
        ],
        correta: 1,
        explicacao: 'O Cerrado abriga nascentes das principais bacias hidrográficas brasileiras, sendo essencial para o abastecimento de água do país inteiro.'
    },
    {
        pergunta: 'O que é a "agricultura de precisão"?',
        opcoes: [
            'Usar apenas ferramentas manuais',
            'Plantar tudo na mesma data',
            'Aplicar tecnologia (GPS, drones, sensores) para otimizar recursos',
            'Cultivar apenas em pequenas áreas'
        ],
        correta: 2,
        explicacao: 'A agricultura de precisão usa tecnologia para aplicar exatamente o que cada parte da lavoura precisa, reduzindo desperdícios e impactos ambientais.'
    },
    {
        pergunta: 'O Paraná é referência mundial em qual prática agrícola sustentável?',
        opcoes: [
            'Plantio direto',
            'Cultivo em estufa',
            'Aquicultura',
            'Hidroponia'
        ],
        correta: 0,
        explicacao: 'O Paraná é pioneiro mundial em plantio direto, com mais de 7 milhões de hectares utilizando essa técnica conservacionista do solo.'
    }
];

// Estado do quiz
let estadoQuiz = {
    perguntaAtual: 0,
    pontuacao: 0,
    acertos: 0,
    erros: 0,
    respondida: false
};

function inicializarQuiz() {
    const botaoIniciar = document.getElementById('botaoIniciarQuiz');
    const botaoProxima = document.getElementById('botaoProxima');
    const botaoReiniciar = document.getElementById('botaoReiniciar');
    const botaoRefazer = document.getElementById('botaoRefazer');

    // Se não estiver na página do quiz, sai da função
    if (!botaoIniciar) {
        return;
    }

    botaoIniciar.addEventListener('click', iniciarQuiz);
    botaoProxima.addEventListener('click', proximaPergunta);
    botaoReiniciar.addEventListener('click', reiniciarQuiz);
    botaoRefazer.addEventListener('click', reiniciarQuiz);
}

function iniciarQuiz() {
    document.getElementById('telaInicial').classList.add('oculto');
    document.getElementById('telaPerguntas').classList.remove('oculto');
    document.getElementById('telaResultado').classList.remove('exibido');

    estadoQuiz = {
        perguntaAtual: 0,
        pontuacao: 0,
        acertos: 0,
        erros: 0,
        respondida: false
    };

    // Contador de quizzes iniciados
    if (typeof incrementarContador === 'function') {
        incrementarContador('agrinho-total-quiz');
    }

    exibirPergunta();
}

function exibirPergunta() {
    const dadosPergunta = perguntasQuiz[estadoQuiz.perguntaAtual];
    const textoPergunta = document.getElementById('textoPergunta');
    const opcoesQuiz = document.getElementById('opcoesQuiz');
    const feedbackQuiz = document.getElementById('feedbackQuiz');
    const botaoProxima = document.getElementById('botaoProxima');
    const textoProgresso = document.getElementById('textoProgresso');
    const barraProgresso = document.getElementById('barraProgresso');
    const textoPontuacao = document.getElementById('textoPontuacao');

    // Atualiza texto da pergunta
    textoPergunta.textContent = dadosPergunta.pergunta;

    // Atualiza progresso
    const numeroAtual = estadoQuiz.perguntaAtual + 1;
    textoProgresso.textContent = numeroAtual + ' / ' + perguntasQuiz.length;
    barraProgresso.style.width = ((numeroAtual / perguntasQuiz.length) * 100) + '%';
    textoPontuacao.textContent = estadoQuiz.pontuacao + ' pts';

    // Limpa estado anterior
    feedbackQuiz.classList.remove('exibido', 'acerto', 'erro');
    botaoProxima.classList.add('oculto');
    estadoQuiz.respondida = false;

    // Cria os botões de opção
    opcoesQuiz.innerHTML = '';
    const letras = ['A', 'B', 'C', 'D'];

    dadosPergunta.opcoes.forEach(function(opcao, indice) {
        const botaoOpcao = document.createElement('button');
        botaoOpcao.className = 'quiz-opcao';
        botaoOpcao.innerHTML = '<span class="letra">' + letras[indice] + '</span>' +
                                '<span>' + opcao + '</span>';
        botaoOpcao.addEventListener('click', function() {
            verificarResposta(indice, botaoOpcao);
        });
        opcoesQuiz.appendChild(botaoOpcao);
    });
}

function verificarResposta(indiceEscolhido, botaoClicado) {
    // Evita múltiplas respostas para a mesma pergunta
    if (estadoQuiz.respondida) {
        return;
    }
    estadoQuiz.respondida = true;

    const dadosPergunta = perguntasQuiz[estadoQuiz.perguntaAtual];
    const todasOpcoes = document.querySelectorAll('.quiz-opcao');
    const feedbackQuiz = document.getElementById('feedbackQuiz');
    const feedbackTitulo = document.getElementById('feedbackTitulo');
    const feedbackTexto = document.getElementById('feedbackTexto');
    const botaoProxima = document.getElementById('botaoProxima');

    // Desabilita todas as opções
    todasOpcoes.forEach(function(opcao) {
        opcao.disabled = true;
    });

    // Marca a correta sempre
    todasOpcoes[dadosPergunta.correta].classList.add('correta');

    // Verifica se acertou
    if (indiceEscolhido === dadosPergunta.correta) {
        estadoQuiz.pontuacao += 10;
        estadoQuiz.acertos += 1;
        feedbackQuiz.classList.add('exibido', 'acerto');
        feedbackTitulo.textContent = '✓ Resposta correta!';
    } else {
        estadoQuiz.erros += 1;
        botaoClicado.classList.add('incorreta');
        feedbackQuiz.classList.add('exibido', 'erro');
        feedbackTitulo.textContent = '✗ Resposta incorreta';
    }

    feedbackTexto.textContent = dadosPergunta.explicacao;

    // Atualiza pontuação visível
    document.getElementById('textoPontuacao').textContent = estadoQuiz.pontuacao + ' pts';

    // Mostra botão de próxima ou finalizar
    botaoProxima.classList.remove('oculto');
    if (estadoQuiz.perguntaAtual < perguntasQuiz.length - 1) {
        botaoProxima.querySelector('span').textContent = '→';
        botaoProxima.firstChild.textContent = 'Próxima pergunta ';
    } else {
        botaoProxima.firstChild.textContent = 'Ver resultado ';
        botaoProxima.querySelector('span').textContent = '🏆';
    }
}

function proximaPergunta() {
    estadoQuiz.perguntaAtual += 1;

    if (estadoQuiz.perguntaAtual < perguntasQuiz.length) {
        exibirPergunta();
    } else {
        exibirResultado();
    }
}

function exibirResultado() {
    document.getElementById('telaPerguntas').classList.add('oculto');
    document.getElementById('telaResultado').classList.add('exibido');

    const aproveitamento = (estadoQuiz.acertos / perguntasQuiz.length) * 100;

    // Define mensagem baseada no aproveitamento
    let emoji, titulo, mensagem;

    if (aproveitamento === 100) {
        emoji = '🏆';
        titulo = 'Perfeito! Você é um especialista!';
        mensagem = 'Você acertou todas as perguntas! Mostrou domínio total sobre o agronegócio sustentável. Compartilhe esse conhecimento!';
    } else if (aproveitamento >= 70) {
        emoji = '🌟';
        titulo = 'Excelente desempenho!';
        mensagem = 'Você tem ótimo conhecimento sobre o tema. Continue se aprofundando — o futuro do campo precisa de gente como você!';
    } else if (aproveitamento >= 50) {
        emoji = '🌱';
        titulo = 'Bom trabalho!';
        mensagem = 'Você acertou mais da metade. Que tal explorar nossa seção de práticas para aprender ainda mais sobre sustentabilidade no campo?';
    } else if (aproveitamento >= 30) {
        emoji = '📚';
        titulo = 'Continue estudando!';
        mensagem = 'Você está no caminho. Visite nossa página de práticas e descubra as principais técnicas do agro sustentável brasileiro.';
    } else {
        emoji = '💪';
        titulo = 'Não desista!';
        mensagem = 'Cada erro é uma oportunidade de aprender. Explore o conteúdo do site e tente novamente — você vai melhorar!';
    }

    document.getElementById('resultadoEmoji').textContent = emoji;
    document.getElementById('resultadoTitulo').textContent = titulo;
    document.getElementById('resultadoPontuacao').textContent =
        estadoQuiz.pontuacao + ' / ' + (perguntasQuiz.length * 10);
    document.getElementById('resultadoMensagem').textContent = mensagem;

    document.getElementById('resumoAcertos').textContent = estadoQuiz.acertos;
    document.getElementById('resumoErros').textContent = estadoQuiz.erros;
    document.getElementById('resumoAproveitamento').textContent = aproveitamento.toFixed(0) + '%';

    // Salva melhor pontuação
    if (typeof salvarMelhorPontuacao === 'function') {
        salvarMelhorPontuacao('agrinho-melhor-pontuacao-quiz', estadoQuiz.pontuacao);
    }

    // Dispara confete se acertou tudo
    if (aproveitamento === 100 && typeof window.dispararConfete === 'function') {
        setTimeout(window.dispararConfete, 400);
        // Segunda rajada de confete para celebrar
        setTimeout(window.dispararConfete, 1200);

        // Desbloqueia conquista de mestre
        if (typeof desbloquearConquista === 'function') {
            desbloquearConquista('mestre-quiz');
        }
    }
}

function reiniciarQuiz() {
    if (confirm('Deseja realmente reiniciar o quiz? Sua pontuação atual será perdida.')) {
        iniciarQuiz();
    }
}

/* ============================================
   7. FORMULARIO DE CONTATO COM VALIDACAO
   ============================================ */

function inicializarFormulario() {
    const formulario = document.getElementById('formularioContato');

    if (!formulario) {
        return;
    }

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        // Limpa erros anteriores
        const camposComErro = formulario.querySelectorAll('.com-erro');
        camposComErro.forEach(function(campo) {
            campo.classList.remove('com-erro');
        });

        // Coleta valores dos campos
        const nome = document.getElementById('campoNome').value.trim();
        const email = document.getElementById('campoEmail').value.trim();
        const assunto = document.getElementById('campoAssunto').value;
        const mensagem = document.getElementById('campoMensagem').value.trim();
        const concordo = document.getElementById('campoConcordo').checked;

        let temErro = false;

        // Validação do nome
        if (nome.length < 3) {
            document.getElementById('campoNome').parentElement.classList.add('com-erro');
            temErro = true;
        }

        // Validação do e-mail (regex simples)
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            document.getElementById('campoEmail').parentElement.classList.add('com-erro');
            temErro = true;
        }

        // Validação do assunto
        if (assunto === '') {
            document.getElementById('campoAssunto').parentElement.classList.add('com-erro');
            temErro = true;
        }

        // Validação da mensagem
        if (mensagem.length < 10) {
            document.getElementById('campoMensagem').parentElement.classList.add('com-erro');
            temErro = true;
        }

        // Validação da concordância
        if (!concordo) {
            document.getElementById('campoConcordo').parentElement.parentElement.classList.add('com-erro');
            temErro = true;
        }

        // Se passou em tudo, ENVIA de verdade via mailto:
        if (!temErro) {
            // Monta a mensagem formatada
            const destinatario = 'agrinhoprogramacao@escola.pr.gov.br';
            const titulosAssunto = {
                'duvida': 'Dúvida sobre o concurso',
                'sugestao': 'Sugestão de prática sustentável',
                'experiencia': 'Compartilhar experiência',
                'parceria': 'Proposta de parceria',
                'outro': 'Outro assunto'
            };
            const assuntoLegivel = titulosAssunto[assunto] || assunto;

            const subject = '[Agro Forte] ' + assuntoLegivel + ' - ' + nome;
            const body =
                'Olá!\n\n' +
                'Recebi este contato pelo site Agro Forte (Projeto Agrinho 2026).\n\n' +
                '── DADOS DO CONTATO ──\n' +
                'Nome: ' + nome + '\n' +
                'E-mail: ' + email + '\n' +
                'Assunto: ' + assuntoLegivel + '\n\n' +
                '── MENSAGEM ──\n' +
                mensagem + '\n\n' +
                '──────────────────────\n' +
                'Enviado pelo site Agro Forte\n' +
                'Projeto desenvolvido por João Gabriel Sabedra Vieira\n' +
                'Colégio Cívico-Militar Douradina — 1º C ADM\n' +
                'Concurso Agrinho 2026 — Categoria Programação';

            // Abre o cliente de email do usuário com a mensagem pronta
            const mailtoUrl = 'mailto:' + destinatario +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);

            // Salva também no localStorage como histórico (caso o usuário queira reenviar)
            try {
                const mensagensSalvas = JSON.parse(localStorage.getItem('agrinho-mensagens') || '[]');
                mensagensSalvas.push({
                    nome: nome,
                    email: email,
                    assunto: assuntoLegivel,
                    mensagem: mensagem,
                    data: new Date().toISOString()
                });
                // Mantém apenas as últimas 10
                if (mensagensSalvas.length > 10) {
                    mensagensSalvas.shift();
                }
                localStorage.setItem('agrinho-mensagens', JSON.stringify(mensagensSalvas));
            } catch (e) {
                // Falha silenciosa
            }

            // Exibe mensagem de sucesso ANTES de abrir o cliente
            const mensagemSucesso = document.getElementById('mensagemSucesso');
            mensagemSucesso.classList.add('exibida');
            mensagemSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Abre o cliente de email do usuário
            setTimeout(function() {
                window.location.href = mailtoUrl;
            }, 500);

            formulario.reset();

            // Esconde a mensagem após 8 segundos
            setTimeout(function() {
                mensagemSucesso.classList.remove('exibida');
            }, 8000);
        }
    });

    // Remove a marcação de erro ao começar a digitar
    const camposInput = formulario.querySelectorAll('input, textarea, select');
    camposInput.forEach(function(campo) {
        campo.addEventListener('input', function() {
            // Procura tanto a classe antiga quanto a nova (compatibilidade)
            const grupoCampo = campo.closest('.campo-formulario-rico') || campo.closest('.campo-formulario');
            if (grupoCampo) {
                grupoCampo.classList.remove('com-erro');
            }
        });
        // Para checkboxes também
        campo.addEventListener('change', function() {
            const grupoCampo = campo.closest('.campo-formulario-rico') || campo.closest('.campo-formulario');
            if (grupoCampo) {
                grupoCampo.classList.remove('com-erro');
            }
        });
    });

    // Aplica estado visual "marcado" no card de aceite
    const checkboxAceite = document.getElementById('campoConcordo');
    if (checkboxAceite) {
        const cardAceite = checkboxAceite.closest('.card-aceite');
        if (cardAceite) {
            checkboxAceite.addEventListener('change', function() {
                if (checkboxAceite.checked) {
                    cardAceite.classList.add('marcado');
                } else {
                    cardAceite.classList.remove('marcado');
                }
            });
        }
    }
}

/* ============================================
   8. CALCULADORA DE IMPACTO SUSTENTAVEL
   ============================================ */

function inicializarCalculadora() {
    const botaoCalcular = document.getElementById('botaoCalcular');

    if (!botaoCalcular) {
        return;
    }

    // Aplica/remove a classe "marcado" no card pai ao alterar o checkbox
    const checks = document.querySelectorAll('.check-impacto');
    checks.forEach(function(check) {
        const card = check.closest('.card-pratica-impacto');
        if (!card) return;

        check.addEventListener('change', function() {
            if (check.checked) {
                card.classList.add('marcado');
            } else {
                card.classList.remove('marcado');
            }
        });
    });

    botaoCalcular.addEventListener('click', function() {
        const checks = document.querySelectorAll('.check-impacto');
        let pontosTotais = 0;
        let pontosMaximos = 0;
        let praticasMarcadas = 0;

        checks.forEach(function(check) {
            const pontos = parseInt(check.dataset.pontos, 10);
            pontosMaximos += pontos;

            if (check.checked) {
                pontosTotais += pontos;
                praticasMarcadas += 1;
            }
        });

        const porcentagem = (pontosTotais / pontosMaximos) * 100;

        // Define mensagem baseada na porcentagem
        let titulo, texto;

        if (porcentagem >= 90) {
            titulo = '🌟 Excelente! Você é um exemplo de sustentabilidade';
            texto = 'Suas atitudes inspiram mudanças positivas. Você marca ' + praticasMarcadas +
                ' das ' + checks.length + ' práticas. Continue assim e compartilhe seu conhecimento!';
        } else if (porcentagem >= 60) {
            titulo = '🌱 Muito bom! Você está no caminho certo';
            texto = 'Você adota ' + praticasMarcadas + ' das ' + checks.length +
                ' práticas listadas. Que tal incluir mais algumas no seu dia a dia?';
        } else if (porcentagem >= 30) {
            titulo = '🌿 Você já faz a sua parte';
            texto = 'Suas ' + praticasMarcadas + ' práticas sustentáveis fazem diferença. ' +
                'Pequenas mudanças adicionais podem ampliar muito seu impacto positivo.';
        } else if (porcentagem > 0) {
            titulo = '💡 Hora de começar a mudança';
            texto = 'Você marcou ' + praticasMarcadas + ' prática' +
                (praticasMarcadas === 1 ? '' : 's') +
                '. Cada pequeno passo conta! Comece com ações simples como economizar água e separar o lixo.';
        } else {
            titulo = '🌍 Vamos começar juntos!';
            texto = 'Nenhuma prática marcada ainda. Que tal escolher uma para começar essa semana? ' +
                'O planeta agradece cada esforço!';
        }

        // Atualiza o resultado
        document.getElementById('tituloImpacto').textContent = titulo;
        document.getElementById('textoImpacto').textContent = texto;

        const resultado = document.getElementById('resultadoImpacto');
        resultado.classList.add('exibido');

        // Anima a barra
        setTimeout(function() {
            document.getElementById('barraImpacto').style.width = porcentagem + '%';
        }, 100);

        // Rola até o resultado
        setTimeout(function() {
            resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
    });
}

/* ============================================
   9. FILTRO DE PRATICAS POR CATEGORIA
   ============================================ */

function inicializarFiltroPraticas() {
    const botoesFiltro = document.querySelectorAll('.filtro-pratica');
    const cards = document.querySelectorAll('.card-pratica[data-categoria]');

    if (botoesFiltro.length === 0) {
        return;
    }

    botoesFiltro.forEach(function(botao) {
        botao.addEventListener('click', function() {
            // Atualiza botão ativo
            botoesFiltro.forEach(function(b) {
                b.classList.remove('ativo', 'botao-primario');
                b.classList.add('botao-secundario');
            });
            botao.classList.add('ativo', 'botao-primario');
            botao.classList.remove('botao-secundario');

            const categoria = botao.dataset.filtro;

            // Filtra cards
            cards.forEach(function(card) {
                if (categoria === 'todos' || card.dataset.categoria === categoria) {
                    card.style.display = 'block';
                    card.style.animation = 'aparecer 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ============================================
   10. TELA DE CARREGAMENTO INICIAL
   ============================================ */

function inicializarTelaCarregamento() {
    const tela = document.getElementById('telaCarregamento');

    if (!tela) {
        return;
    }

    // Esconde a tela após o carregamento da página
    window.addEventListener('load', function() {
        setTimeout(function() {
            tela.classList.add('escondido');

            // Remove totalmente do DOM após a transição
            setTimeout(function() {
                if (tela.parentNode) {
                    tela.parentNode.removeChild(tela);
                }
            }, 800);
        }, 800);
    });
}

/* ============================================
   11. CONTROLES DE ACESSIBILIDADE
   ============================================ */

function inicializarAcessibilidade() {
    const botaoFonteMenor = document.getElementById('btnFonteMenor');
    const botaoFontePadrao = document.getElementById('btnFontePadrao');
    const botaoFonteMaior = document.getElementById('btnFonteMaior');
    const botaoContraste = document.getElementById('btnContraste');

    if (!botaoFontePadrao) {
        return;
    }

    // Recupera preferências salvas
    const fonteSalva = localStorage.getItem('agrinho-fonte') || 'padrao';
    const contrasteSalvo = localStorage.getItem('agrinho-contraste') === 'true';

    aplicarTamanhoFonte(fonteSalva);

    if (contrasteSalvo) {
        document.body.classList.add('alto-contraste');
        botaoContraste.classList.add('ativo');
    }

    // Eventos dos botões
    botaoFonteMenor.addEventListener('click', function() {
        aplicarTamanhoFonte('padrao');
        localStorage.setItem('agrinho-fonte', 'padrao');
    });

    botaoFontePadrao.addEventListener('click', function() {
        aplicarTamanhoFonte('grande');
        localStorage.setItem('agrinho-fonte', 'grande');
    });

    botaoFonteMaior.addEventListener('click', function() {
        aplicarTamanhoFonte('extragrande');
        localStorage.setItem('agrinho-fonte', 'extragrande');
    });

    botaoContraste.addEventListener('click', function() {
        document.body.classList.toggle('alto-contraste');
        botaoContraste.classList.toggle('ativo');
        const ativo = document.body.classList.contains('alto-contraste');
        localStorage.setItem('agrinho-contraste', ativo);
    });
}

function aplicarTamanhoFonte(tamanho) {
    document.body.classList.remove('fonte-grande', 'fonte-extragrande');

    if (tamanho === 'grande') {
        document.body.classList.add('fonte-grande');
    } else if (tamanho === 'extragrande') {
        document.body.classList.add('fonte-extragrande');
    }
}

/* ============================================
   12. BUSCA INTERNA NO SITE
   ============================================ */

// Banco de dados de conteúdo para a busca
const conteudoSite = [
    {
        titulo: 'Plantio Direto',
        descricao: 'Técnica que preserva a estrutura do solo e reduz erosão, dispensando o revolvimento da terra.',
        pagina: 'praticas.html',
        categoria: 'Práticas',
        ancora: '#plantio-direto'
    },
    {
        titulo: 'Rotação de Culturas',
        descricao: 'Alternar diferentes plantas na mesma área melhora fertilidade e controla pragas.',
        pagina: 'praticas.html',
        categoria: 'Práticas',
        ancora: '#rotacao'
    },
    {
        titulo: 'Sistema Agroflorestal',
        descricao: 'Combinação de cultivos com árvores nativas para recuperar áreas degradadas.',
        pagina: 'praticas.html',
        categoria: 'Práticas',
        ancora: '#agrofloresta'
    },
    {
        titulo: 'Energia Solar Rural',
        descricao: 'Painéis fotovoltaicos no campo geram eletricidade limpa para a propriedade.',
        pagina: 'praticas.html',
        categoria: 'Práticas',
        ancora: '#energia'
    },
    {
        titulo: 'Pecuária Sustentável',
        descricao: 'Manejo rotacionado de pastagens e bem-estar animal.',
        pagina: 'praticas.html',
        categoria: 'Práticas',
        ancora: '#pecuaria'
    },
    {
        titulo: 'Bioinsumos',
        descricao: 'Microrganismos benéficos que substituem fertilizantes químicos.',
        pagina: 'praticas.html',
        categoria: 'Práticas'
    },
    {
        titulo: 'Captação de Água da Chuva',
        descricao: 'Cisternas e açudes que armazenam água para uso sustentável.',
        pagina: 'praticas.html',
        categoria: 'Práticas'
    },
    {
        titulo: 'Mata Ciliar',
        descricao: 'Vegetação nativa ao redor de rios que protege a qualidade da água.',
        pagina: 'praticas.html',
        categoria: 'Práticas'
    },
    {
        titulo: 'Quiz Interativo',
        descricao: 'Teste seu conhecimento com 10 perguntas sobre o agro sustentável.',
        pagina: 'quiz.html',
        categoria: 'Interativo'
    },
    {
        titulo: 'Simulador de Fazenda',
        descricao: 'Construa sua fazenda sustentável e veja o impacto das suas escolhas.',
        pagina: 'simulador.html',
        categoria: 'Interativo'
    },
    {
        titulo: 'Glossário do Agro',
        descricao: 'Dicionário de termos técnicos sobre agronegócio sustentável.',
        pagina: 'glossario.html',
        categoria: 'Conteúdo'
    },
    {
        titulo: 'Calculadora de Impacto',
        descricao: 'Descubra quantas atitudes sustentáveis você pratica no dia a dia.',
        pagina: 'sobre.html',
        categoria: 'Interativo'
    },
    {
        titulo: 'Linha do Tempo',
        descricao: 'A evolução do agro sustentável de 1970 até hoje.',
        pagina: 'sobre.html',
        categoria: 'Conteúdo'
    },
    {
        titulo: 'Mapa do Brasil Sustentável',
        descricao: 'Conheça as práticas sustentáveis em cada região do país.',
        pagina: 'sobre.html',
        categoria: 'Interativo'
    },
    {
        titulo: 'Contato',
        descricao: 'Envie sua mensagem, sugestão ou compartilhe sua experiência.',
        pagina: 'contato.html',
        categoria: 'Geral'
    },
    {
        titulo: 'Agricultura de Precisão',
        descricao: 'Uso de tecnologia, GPS e sensores para otimizar recursos no campo.',
        pagina: 'glossario.html',
        categoria: 'Termo'
    },
    {
        titulo: 'Sequestro de Carbono',
        descricao: 'Processo natural de captura de CO2 da atmosfera pelo solo e plantas.',
        pagina: 'glossario.html',
        categoria: 'Termo'
    },
    {
        titulo: 'Reserva Legal',
        descricao: 'Área de cada propriedade rural mantida com vegetação nativa.',
        pagina: 'glossario.html',
        categoria: 'Termo'
    }
];

function inicializarBusca() {
    const botaoBusca = document.getElementById('botaoBusca');
    const overlayBusca = document.getElementById('overlayBusca');
    const inputBusca = document.getElementById('inputBusca');
    const resultados = document.getElementById('resultadosBusca');
    const fecharBusca = document.getElementById('fecharBusca');

    if (!botaoBusca || !overlayBusca) {
        return;
    }

    // Abre a busca
    botaoBusca.addEventListener('click', function() {
        overlayBusca.classList.add('aberto');
        setTimeout(function() {
            inputBusca.focus();
        }, 200);
    });

    // Fecha a busca
    function fechar() {
        overlayBusca.classList.remove('aberto');
        inputBusca.value = '';
        renderizarResultados('');
    }

    fecharBusca.addEventListener('click', fechar);

    overlayBusca.addEventListener('click', function(evento) {
        if (evento.target === overlayBusca) {
            fechar();
        }
    });

    // Tecla ESC fecha
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape' && overlayBusca.classList.contains('aberto')) {
            fechar();
        }
    });

    // Pesquisa em tempo real
    inputBusca.addEventListener('input', function() {
        renderizarResultados(inputBusca.value);
    });

    // Renderização inicial vazia
    renderizarResultados('');
}

function renderizarResultados(termo) {
    const resultados = document.getElementById('resultadosBusca');

    if (!resultados) {
        return;
    }

    if (!termo || termo.trim().length < 2) {
        resultados.innerHTML = '<div class="busca-vazio">' +
            '<p style="font-size: 3rem; margin-bottom: 0.5rem;">🔍</p>' +
            '<p>Digite pelo menos 2 letras para buscar...</p>' +
            '</div>';
        return;
    }

    const termoBuscaNormalizado = normalizarTexto(termo);

    // Filtra o conteúdo
    const itensEncontrados = conteudoSite.filter(function(item) {
        const tituloNormalizado = normalizarTexto(item.titulo);
        const descricaoNormalizada = normalizarTexto(item.descricao);
        return tituloNormalizado.indexOf(termoBuscaNormalizado) !== -1 ||
               descricaoNormalizada.indexOf(termoBuscaNormalizado) !== -1;
    });

    // Exibe resultados ou mensagem
    if (itensEncontrados.length === 0) {
        resultados.innerHTML = '<div class="busca-sem-resultado">' +
            '<p style="font-size: 3rem; margin-bottom: 0.5rem;">😕</p>' +
            '<p>Nenhum resultado encontrado para "<strong>' + termo + '</strong>"</p>' +
            '<p style="font-size: 0.85rem; margin-top: 0.5rem;">Tente outros termos como: plantio, energia, água, quiz</p>' +
            '</div>';
        return;
    }

    let html = '<p style="font-size: 0.85rem; color: var(--texto-suave); margin-bottom: 1rem;">' +
        itensEncontrados.length + ' resultado' + (itensEncontrados.length === 1 ? '' : 's') +
        ' para "<strong>' + termo + '</strong>"</p>';

    itensEncontrados.forEach(function(item) {
        const link = item.pagina + (item.ancora || '');
        html += '<a href="' + link + '" class="resultado-busca">' +
            '<div class="titulo-resultado">' +
                '<span>' + item.titulo + '</span>' +
                '<span class="pagina-resultado">' + item.categoria + '</span>' +
            '</div>' +
            '<p>' + item.descricao + '</p>' +
            '</a>';
    });

    resultados.innerHTML = html;
}

// Remove acentos e converte para minúscula para busca
function normalizarTexto(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* ============================================
   13. CONFETE DE CELEBRAÇÃO (QUIZ 100%)
   ============================================ */

function dispararConfete() {
    const cores = ['#4f9d50', '#1a4d2e', '#d4a017', '#f0d878', '#a8d5a8', '#5fb3e3'];
    const quantidade = 80;

    for (let i = 0; i < quantidade; i++) {
        criarConfete(cores);
    }
}

function criarConfete(cores) {
    const confete = document.createElement('div');
    confete.className = 'confete';

    const tamanho = Math.random() * 8 + 6;
    confete.style.width = tamanho + 'px';
    confete.style.height = tamanho + 'px';
    confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
    confete.style.left = Math.random() * 100 + 'vw';
    confete.style.animationDuration = (Math.random() * 2 + 2) + 's';
    confete.style.animationDelay = Math.random() * 0.5 + 's';

    // Forma aleatória (quadrado ou círculo)
    if (Math.random() > 0.5) {
        confete.style.borderRadius = '50%';
    }

    document.body.appendChild(confete);

    // Remove o confete após a animação
    setTimeout(function() {
        if (confete.parentNode) {
            confete.parentNode.removeChild(confete);
        }
    }, 4000);
}

/* ============================================
   14. MAPA INTERATIVO DO BRASIL
   ============================================ */

const dadosRegioes = {
    norte: {
        nome: 'Região Norte',
        icone: '🌳',
        descricao: 'Maior bioma do Brasil, abriga a Amazônia. Desafios e oportunidades únicas para o agro sustentável.',
        estatisticas: [
            { titulo: 'Floresta Amazônica', valor: 'Mais de 60% do território da região, vital para o equilíbrio climático global.' },
            { titulo: 'Bioeconomia', valor: 'Açaí, castanha e cupuaçu — produtos da floresta em pé que geram renda sem desmatar.' },
            { titulo: 'Pecuária Sustentável', valor: 'ILPF (Integração Lavoura-Pecuária-Floresta) recuperando áreas degradadas.' }
        ]
    },
    nordeste: {
        nome: 'Região Nordeste',
        icone: '☀️',
        descricao: 'Diversidade de biomas como Caatinga e Mata Atlântica. Pioneira em agricultura adaptada ao semiárido.',
        estatisticas: [
            { titulo: 'Convivência com o Semiárido', valor: 'Cisternas e tecnologias sociais garantem água e produção em regiões secas.' },
            { titulo: 'Fruticultura Irrigada', valor: 'Vale do São Francisco produz manga, uva e melão para exportação.' },
            { titulo: 'Energia Renovável', valor: 'Líder nacional em energia eólica e solar, gerando renda no campo.' }
        ]
    },
    centroOeste: {
        nome: 'Região Centro-Oeste',
        icone: '🌾',
        descricao: 'Coração agrícola do Brasil, com o Cerrado e o Pantanal. Líder em produção de grãos e proteína animal.',
        estatisticas: [
            { titulo: 'Plantio Direto', valor: 'Mais de 80% das lavouras de soja e milho usam essa técnica conservacionista.' },
            { titulo: 'Pantanal', valor: 'Maior área úmida do planeta, exemplo de pecuária extensiva integrada à conservação.' },
            { titulo: 'Cerrado', valor: 'Bioma "berço das águas" do Brasil, exige práticas que protegem nascentes.' }
        ]
    },
    sudeste: {
        nome: 'Região Sudeste',
        icone: '☕',
        descricao: 'Tecnologia e tradição. Líder em café, cana-de-açúcar, citricultura e leite, com forte agricultura familiar.',
        estatisticas: [
            { titulo: 'Cafeicultura', valor: 'Brasil é maior produtor mundial; cafés especiais ganham mercado internacional.' },
            { titulo: 'Bioenergia', valor: 'Etanol e biodiesel da cana movem veículos e geram energia limpa.' },
            { titulo: 'Reflorestamento', valor: 'Recuperação de matas ciliares e da Mata Atlântica preserva nascentes.' }
        ]
    },
    sul: {
        nome: 'Região Sul (com destaque para o Paraná)',
        icone: '🌽',
        descricao: 'Berço do plantio direto no Brasil. Forte agricultura familiar, cooperativismo e diversificação produtiva.',
        estatisticas: [
            { titulo: 'Paraná - Estado-líder', valor: 'Pioneiro mundial em plantio direto, com mais de 7 milhões de hectares na técnica.' },
            { titulo: 'Cooperativismo', valor: 'Modelo cooperativista paranaense é referência mundial em organização rural.' },
            { titulo: 'Agricultura Familiar', valor: 'Pequenas propriedades produzem alimentos diversificados e fortalecem a economia local.' }
        ]
    }
};

function inicializarMapa() {
    const regioes = document.querySelectorAll('.regiao-mapa');
    const infoRegiao = document.getElementById('infoRegiao');

    if (regioes.length === 0 || !infoRegiao) {
        return;
    }

    regioes.forEach(function(regiao) {
        regiao.addEventListener('click', function() {
            const idRegiao = regiao.dataset.regiao;

            // Atualiza visual da seleção
            regioes.forEach(function(r) {
                r.classList.remove('selecionada');
            });
            regiao.classList.add('selecionada');

            // Exibe informações
            exibirInfoRegiao(idRegiao);
        });

        // Acessibilidade: permite seleção por teclado
        regiao.addEventListener('keydown', function(evento) {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                regiao.click();
            }
        });
    });
}

function exibirInfoRegiao(idRegiao) {
    const info = dadosRegioes[idRegiao];
    const infoRegiao = document.getElementById('infoRegiao');

    if (!info || !infoRegiao) {
        return;
    }

    let html = '<h3><span class="icone-regiao">' + info.icone + '</span>' + info.nome + '</h3>' +
        '<p style="margin-bottom: 1.5rem;">' + info.descricao + '</p>';

    info.estatisticas.forEach(function(stat) {
        html += '<div class="estatistica-regiao">' +
            '<strong>' + stat.titulo + '</strong>' +
            '<p>' + stat.valor + '</p>' +
            '</div>';
    });

    infoRegiao.innerHTML = html;
    infoRegiao.style.animation = 'aparecer 0.4s ease';
}

/* ============================================
   15. SIMULADOR DE FAZENDA SUSTENTÁVEL
   ============================================
   O simulador permite ao usuário "construir" uma fazenda
   com 12 lotes, escolhendo entre 12 práticas sustentáveis.
   Cada prática tem 4 atributos:
     - custo (R$): subtraído do orçamento de R$ 1.000
     - produtividade: contribui para indicador de produção
     - sustentabilidade: contribui para impacto ambiental
     - lucro: contribui para retorno financeiro
   Os 3 indicadores são atualizados em tempo real ao
   adicionar/remover práticas. No final, o usuário recebe
   um "nível de fazenda" baseado na pontuação total.
   ============================================ */

// Catálogo de práticas disponíveis no simulador
// Cada prática tem dados balanceados para criar dilemas
// estratégicos (custo x produtividade x sustentabilidade)
const praticasSimulador = [
    { id: 'plantio-direto', nome: 'Plantio Direto', icone: '🌾', custo: 100, produtividade: 15, sustentabilidade: 20, lucro: 10, descricao: 'Preserva o solo, retém umidade e reduz erosão.' },
    { id: 'rotacao', nome: 'Rotação Culturas', icone: '🔄', custo: 80, produtividade: 12, sustentabilidade: 15, lucro: 8, descricao: 'Quebra ciclo de pragas e melhora a fertilidade.' },
    { id: 'irrigacao', nome: 'Irrigação Smart', icone: '💧', custo: 150, produtividade: 25, sustentabilidade: 18, lucro: 12, descricao: 'Sensores otimizam o uso da água.' },
    { id: 'solar', nome: 'Energia Solar', icone: '☀️', custo: 200, produtividade: 5, sustentabilidade: 25, lucro: 20, descricao: 'Reduz custos de energia em até 95%.' },
    { id: 'biodigestor', nome: 'Biodigestor', icone: '🔥', custo: 180, produtividade: 8, sustentabilidade: 22, lucro: 15, descricao: 'Transforma resíduos em biogás.' },
    { id: 'mata-ciliar', nome: 'Mata Ciliar', icone: '🌿', custo: 60, produtividade: 0, sustentabilidade: 30, lucro: 5, descricao: 'Protege rios e atrai polinizadores.' },
    { id: 'agrofloresta', nome: 'Agrofloresta', icone: '🌳', custo: 220, produtividade: 18, sustentabilidade: 28, lucro: 18, descricao: 'Sistema integrado com árvores e cultivos.' },
    { id: 'pasto-rotacionado', nome: 'Pasto Rotacion.', icone: '🐄', custo: 120, produtividade: 20, sustentabilidade: 18, lucro: 14, descricao: 'Aumenta produção animal por hectare.' },
    { id: 'apicultura', nome: 'Apicultura', icone: '🐝', custo: 70, produtividade: 10, sustentabilidade: 20, lucro: 12, descricao: 'Polinização aumenta a produção.' },
    { id: 'bioinsumos', nome: 'Bioinsumos', icone: '🦠', custo: 90, produtividade: 12, sustentabilidade: 22, lucro: 10, descricao: 'Microrganismos benéficos no lugar de químicos.' },
    { id: 'eolica', nome: 'Energia Eólica', icone: '💨', custo: 250, produtividade: 5, sustentabilidade: 28, lucro: 22, descricao: 'Vento gera energia e renda extra.' },
    { id: 'cisterna', nome: 'Cisterna', icone: '🌊', custo: 50, produtividade: 8, sustentabilidade: 18, lucro: 6, descricao: 'Capta e armazena água da chuva.' }
];

let estadoSimulador = {
    dinheiro: 1000,
    lotes: Array(12).fill(null),
    loteAtivo: -1
};

function inicializarSimulador() {
    const fazendaGrade = document.getElementById('fazendaGrade');

    if (!fazendaGrade) {
        return;
    }

    construirGradeFazenda();
    construirCatalogoPraticas();
    atualizarDinheiroDisponivel();
    atualizarStatsSimulador();

    // Botão de finalizar
    const botaoFinalizar = document.getElementById('botaoFinalizar');
    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', finalizarSimulacao);
    }

    // Botão de reiniciar
    const botaoReiniciarSimulador = document.getElementById('botaoReiniciarSimulador');
    if (botaoReiniciarSimulador) {
        botaoReiniciarSimulador.addEventListener('click', reiniciarSimulador);
    }

    // Botão "Tentar novamente" (do resultado) - dispara a mesma ação de reiniciar
    const botaoNovaSimulacao = document.getElementById('botaoNovaSimulacao');
    if (botaoNovaSimulacao) {
        botaoNovaSimulacao.addEventListener('click', reiniciarSimulador);
    }

    // Modal de seleção
    const fecharModal = document.getElementById('fecharModalPratica');
    if (fecharModal) {
        fecharModal.addEventListener('click', fecharModalPratica);
    }

    const modalFundo = document.getElementById('modalPratica');
    if (modalFundo) {
        modalFundo.addEventListener('click', function(e) {
            if (e.target === modalFundo) {
                fecharModalPratica();
            }
        });
    }
}

function construirGradeFazenda() {
    const grade = document.getElementById('fazendaGrade');
    grade.innerHTML = '';

    estadoSimulador.lotes.forEach(function(pratica, indice) {
        const lote = document.createElement('div');
        lote.className = 'lote';
        lote.dataset.indice = indice;

        if (pratica) {
            lote.classList.add('preenchido');
            lote.innerHTML = '<span class="lote-icone">' + pratica.icone + '</span>' +
                '<span class="lote-nome">' + pratica.nome + '</span>' +
                '<span class="lote-remover" data-indice="' + indice + '">✕</span>';
        } else {
            lote.innerHTML = '<span class="lote-icone">➕</span>' +
                '<span class="lote-vazio-texto">Lote vazio</span>';
        }

        lote.addEventListener('click', function(e) {
            // Clique no botão de remover
            if (e.target.classList.contains('lote-remover')) {
                e.stopPropagation();
                removerPraticaLote(indice);
                return;
            }

            // Clique no lote vazio - abre modal
            if (!estadoSimulador.lotes[indice]) {
                abrirModalPratica(indice);
            }
        });

        grade.appendChild(lote);
    });
}

function construirCatalogoPraticas() {
    const catalogo = document.getElementById('catalogoPraticas');

    if (!catalogo) {
        return;
    }

    catalogo.innerHTML = '';

    praticasSimulador.forEach(function(pratica) {
        const card = document.createElement('div');
        card.className = 'pratica-disponivel';

        if (pratica.custo > estadoSimulador.dinheiro) {
            card.classList.add('indisponivel');
        }

        card.innerHTML = '<div class="icone">' + pratica.icone + '</div>' +
            '<div class="nome">' + pratica.nome + '</div>' +
            '<div class="custo">R$ ' + pratica.custo + '</div>';

        card.title = pratica.descricao;
        catalogo.appendChild(card);
    });
}

function abrirModalPratica(indiceLote) {
    estadoSimulador.loteAtivo = indiceLote;

    const modal = document.getElementById('modalPratica');
    const lista = document.getElementById('listaPraticasModal');

    if (!modal || !lista) {
        return;
    }

    lista.innerHTML = '';

    praticasSimulador.forEach(function(pratica) {
        const item = document.createElement('div');
        item.className = 'modal-pratica';

        const indisponivel = pratica.custo > estadoSimulador.dinheiro;
        if (indisponivel) {
            item.classList.add('indisponivel');
        }

        item.innerHTML = '<div class="modal-pratica-cabecalho">' +
            '<div class="modal-pratica-titulo">' +
                '<span style="font-size: 1.4rem;">' + pratica.icone + '</span>' +
                '<span>' + pratica.nome + '</span>' +
            '</div>' +
            '<div class="modal-pratica-custo">R$ ' + pratica.custo + '</div>' +
        '</div>' +
        '<p class="modal-pratica-descricao">' + pratica.descricao + '</p>';

        if (!indisponivel) {
            item.addEventListener('click', function() {
                adicionarPraticaLote(pratica);
            });
        }

        lista.appendChild(item);
    });

    modal.classList.add('aberto');
}

function fecharModalPratica() {
    const modal = document.getElementById('modalPratica');
    if (modal) {
        modal.classList.remove('aberto');
    }
    estadoSimulador.loteAtivo = -1;
}

function adicionarPraticaLote(pratica) {
    if (estadoSimulador.loteAtivo === -1) {
        return;
    }

    if (pratica.custo > estadoSimulador.dinheiro) {
        return;
    }

    estadoSimulador.lotes[estadoSimulador.loteAtivo] = pratica;
    estadoSimulador.dinheiro -= pratica.custo;

    construirGradeFazenda();
    construirCatalogoPraticas();
    atualizarDinheiroDisponivel();
    atualizarStatsSimulador();
    fecharModalPratica();
}

function removerPraticaLote(indice) {
    const pratica = estadoSimulador.lotes[indice];

    if (!pratica) {
        return;
    }

    // Devolve metade do dinheiro
    estadoSimulador.dinheiro += Math.floor(pratica.custo / 2);
    estadoSimulador.lotes[indice] = null;

    construirGradeFazenda();
    construirCatalogoPraticas();
    atualizarDinheiroDisponivel();
    atualizarStatsSimulador();
}

function atualizarDinheiroDisponivel() {
    const elemento = document.getElementById('dinheiroDisponivel');
    if (elemento) {
        elemento.textContent = 'R$ ' + estadoSimulador.dinheiro;
    }
}

function atualizarStatsSimulador() {
    let totalProdutividade = 0;
    let totalSustentabilidade = 0;
    let totalLucro = 0;
    let lotesPreenchidos = 0;

    estadoSimulador.lotes.forEach(function(pratica) {
        if (pratica) {
            totalProdutividade += pratica.produtividade;
            totalSustentabilidade += pratica.sustentabilidade;
            totalLucro += pratica.lucro;
            lotesPreenchidos += 1;
        }
    });

    // Calcula porcentagens (limite máximo teórico de 12 lotes * 30 = 360 pra cada)
    const maxValor = 240;
    const porcentProdutividade = Math.min(100, (totalProdutividade / maxValor) * 100);
    const porcentSustentabilidade = Math.min(100, (totalSustentabilidade / maxValor) * 100);
    const porcentLucro = Math.min(100, (totalLucro / maxValor) * 100);

    atualizarStat('produtividade', totalProdutividade, porcentProdutividade);
    atualizarStat('sustentabilidade', totalSustentabilidade, porcentSustentabilidade);
    atualizarStat('lucro', totalLucro, porcentLucro);

    // Mensagem dinâmica
    const mensagem = document.getElementById('mensagemSimulador');
    if (mensagem) {
        if (lotesPreenchidos === 0) {
            mensagem.textContent = '💡 Comece clicando em um lote vazio para adicionar uma prática.';
        } else if (lotesPreenchidos < 6) {
            mensagem.textContent = '🌱 Bom começo! Continue adicionando práticas variadas.';
        } else if (lotesPreenchidos < 12) {
            mensagem.textContent = '🌿 Sua fazenda está se desenvolvendo bem! Diversifique as práticas.';
        } else {
            mensagem.textContent = '🏆 Fazenda completa! Clique em "Finalizar" para ver seu resultado.';
        }
    }

    const botaoFinalizar = document.getElementById('botaoFinalizar');
    if (botaoFinalizar) {
        botaoFinalizar.disabled = lotesPreenchidos === 0;
        if (lotesPreenchidos === 0) {
            botaoFinalizar.classList.add('botao-desabilitado');
        } else {
            botaoFinalizar.classList.remove('botao-desabilitado');
        }
    }
}

function atualizarStat(tipo, valorAbsoluto, porcentagem) {
    const valorEl = document.getElementById('valor' + tipo.charAt(0).toUpperCase() + tipo.slice(1));
    const barraEl = document.getElementById('barra' + tipo.charAt(0).toUpperCase() + tipo.slice(1));

    if (valorEl) {
        valorEl.textContent = valorAbsoluto + ' pts';
    }

    if (barraEl) {
        barraEl.style.width = porcentagem + '%';
    }
}

function finalizarSimulacao() {
    let totalProdutividade = 0;
    let totalSustentabilidade = 0;
    let totalLucro = 0;
    let lotesPreenchidos = 0;

    estadoSimulador.lotes.forEach(function(pratica) {
        if (pratica) {
            totalProdutividade += pratica.produtividade;
            totalSustentabilidade += pratica.sustentabilidade;
            totalLucro += pratica.lucro;
            lotesPreenchidos += 1;
        }
    });

    const pontuacaoTotal = totalProdutividade + totalSustentabilidade + totalLucro;

    // Contador de fazendas criadas
    if (typeof incrementarContador === 'function') {
        incrementarContador('agrinho-total-simulador');
    }

    let medalha, nivel, mensagem;

    if (lotesPreenchidos < 6) {
        medalha = '🌱';
        nivel = 'Fazenda Iniciante';
        mensagem = 'Você começou! Para uma fazenda mais produtiva, preencha mais lotes e diversifique as práticas.';
    } else if (totalSustentabilidade < 100) {
        medalha = '🌾';
        nivel = 'Fazenda Convencional';
        mensagem = 'Você produz, mas pode melhorar a sustentabilidade. Adicione práticas como mata ciliar, agrofloresta e energia renovável.';
    } else if (pontuacaoTotal < 300) {
        medalha = '🌿';
        nivel = 'Fazenda Sustentável';
        mensagem = 'Bom equilíbrio entre produção e meio ambiente! Você está no caminho do agro do futuro.';
    } else if (pontuacaoTotal < 450) {
        medalha = '🌟';
        nivel = 'Fazenda Modelo';
        mensagem = 'Excelente! Sua fazenda combina alta produtividade, sustentabilidade e lucro. Um exemplo para o setor.';
    } else {
        medalha = '🏆';
        nivel = 'Fazenda do Futuro';
        mensagem = 'Perfeição! Você criou uma fazenda exemplar — produtiva, lucrativa e em harmonia total com o meio ambiente. O agro forte e sustentável que o Brasil precisa!';
    }

    const resultado = document.getElementById('resultadoSimulador');
    if (resultado) {
        document.getElementById('medalhaResultado').textContent = medalha;
        document.getElementById('nivelFazenda').textContent = nivel;
        document.getElementById('mensagemResultado').textContent = mensagem;
        document.getElementById('pontuacaoFinal').textContent = pontuacaoTotal;
        document.getElementById('praticasUsadas').textContent = lotesPreenchidos + ' de 12 lotes';
        document.getElementById('investimentoTotal').textContent = 'R$ ' + (1000 - estadoSimulador.dinheiro);

        resultado.classList.add('exibido');
        resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Confete se atingiu nível máximo
        if (medalha === '🏆') {
            dispararConfete();
        }
    }
}

function reiniciarSimulador() {
    if (confirm('Deseja reiniciar a simulação? Sua fazenda atual será apagada.')) {
        estadoSimulador = {
            dinheiro: 1000,
            lotes: Array(12).fill(null),
            loteAtivo: -1
        };

        construirGradeFazenda();
        construirCatalogoPraticas();
        atualizarDinheiroDisponivel();
        atualizarStatsSimulador();

        const resultado = document.getElementById('resultadoSimulador');
        if (resultado) {
            resultado.classList.remove('exibido');
        }

        // Volta ao topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/* ============================================
   16. GLOSSÁRIO INTERATIVO
   ============================================ */

function inicializarGlossario() {
    const lista = document.getElementById('listaGlossario');

    if (!lista) {
        return;
    }

    // Acordeão (expandir/recolher)
    const cabecalhos = lista.querySelectorAll('.termo-cabecalho');
    cabecalhos.forEach(function(cabecalho) {
        cabecalho.addEventListener('click', function() {
            const termo = cabecalho.parentElement;
            termo.classList.toggle('aberto');
        });
    });

    // Filtro por letra
    const letras = document.querySelectorAll('.letra-filtro');
    letras.forEach(function(letra) {
        letra.addEventListener('click', function() {
            const letraSelecionada = letra.dataset.letra;

            letras.forEach(function(l) { l.classList.remove('ativa'); });
            letra.classList.add('ativa');

            filtrarGlossario(letraSelecionada, '');
            const inputBusca = document.getElementById('buscaGlossario');
            if (inputBusca) {
                inputBusca.value = '';
            }
        });
    });

    // Busca dinâmica
    const inputBuscaGlossario = document.getElementById('buscaGlossario');
    if (inputBuscaGlossario) {
        inputBuscaGlossario.addEventListener('input', function() {
            const valor = inputBuscaGlossario.value;

            // Reseta filtro de letra
            letras.forEach(function(l) { l.classList.remove('ativa'); });
            const letraTodas = document.querySelector('.letra-filtro[data-letra="todas"]');
            if (letraTodas) {
                letraTodas.classList.add('ativa');
            }

            filtrarGlossario('todas', valor);
        });
    }
}

function filtrarGlossario(letra, termoBusca) {
    const termos = document.querySelectorAll('.termo-glossario');
    const termoNormalizado = normalizarTexto(termoBusca || '');
    let visiveis = 0;

    termos.forEach(function(termo) {
        const letraTermo = termo.dataset.letra;
        const tituloTermo = normalizarTexto(termo.dataset.titulo || '');
        const conteudoTermo = normalizarTexto(termo.textContent);

        let mostra = true;

        // Filtro por letra
        if (letra && letra !== 'todas' && letraTermo !== letra) {
            mostra = false;
        }

        // Filtro por busca
        if (termoNormalizado && termoNormalizado.length >= 2) {
            if (tituloTermo.indexOf(termoNormalizado) === -1 &&
                conteudoTermo.indexOf(termoNormalizado) === -1) {
                mostra = false;
            }
        }

        if (mostra) {
            termo.classList.remove('oculto');
            visiveis += 1;
        } else {
            termo.classList.add('oculto');
        }
    });

    // Mostra/esconde mensagem de vazio
    const vazio = document.getElementById('glossarioVazio');
    if (vazio) {
        if (visiveis === 0) {
            vazio.classList.remove('oculto');
        } else {
            vazio.classList.add('oculto');
        }
    }
}

/* ============================================
   17. SISTEMA DE CONQUISTAS (BADGES)
   ============================================
   Gamificação inspirada em sistemas de achievements.
   O usuário desbloqueia 10 conquistas distintas ao
   interagir com diferentes partes do site:
     - Visitar páginas específicas (rastreado em localStorage)
     - Clicar em elementos-chave (mapa, calculadora, etc.)
     - Completar funcionalidades (quiz, simulador, jogo)
   Quando uma conquista é desbloqueada:
     1. Salva no localStorage (persistente)
     2. Mostra notificação animada deslizante
     3. Atualiza o painel de conquistas na home
     4. Pode disparar outras conquistas (efeito cascata)
   ============================================ */

// Definição das conquistas disponíveis
const conquistasDisponiveis = [
    { id: 'visitante', icone: '🌱', nome: 'Visitante do Agro', descricao: 'Visitou a página inicial' },
    { id: 'explorador', icone: '🔍', nome: 'Explorador', descricao: 'Visitou todas as páginas do site' },
    { id: 'estudante', icone: '📖', nome: 'Estudante Aplicado', descricao: 'Abriu o glossário' },
    { id: 'curioso', icone: '🗺️', nome: 'Mapa Decifrado', descricao: 'Clicou em uma região do mapa do Brasil' },
    { id: 'aprendiz', icone: '🎯', nome: 'Aprendiz do Agro', descricao: 'Completou o quiz' },
    { id: 'mestre-quiz', icone: '🏆', nome: 'Mestre do Conhecimento', descricao: 'Acertou 100% no quiz' },
    { id: 'fazendeiro', icone: '🚜', nome: 'Fazendeiro Iniciante', descricao: 'Usou o simulador de fazenda' },
    { id: 'guardiao', icone: '🛡️', nome: 'Guardião do Campo', descricao: 'Jogou o Defensor do Agro' },
    { id: 'sustentavel', icone: '🌍', nome: 'Consciência Verde', descricao: 'Usou a calculadora de impacto' },
    { id: 'colecionador', icone: '⭐', nome: 'Colecionador', descricao: 'Desbloqueou 5 conquistas' },
    // ===== CONQUISTAS EXCLUSIVAS DO JOGO (Opção C) =====
    { id: 'combo-mestre', icone: '🔥', nome: 'Combo Mestre', descricao: 'Atingiu combo de 20 no jogo' },
    { id: 'invencivel', icone: '💎', nome: 'Invencível', descricao: 'Venceu o jogo sem perder nenhuma vida' },
    { id: 'milionario', icone: '💰', nome: 'Milionário do Agro', descricao: 'Pontuou 500+ em uma única partida' },
    { id: 'maratonista', icone: '🏃', nome: 'Maratonista', descricao: 'Sobreviveu 60 segundos no modo Endless' },
    { id: 'colecionador-pro', icone: '🎖️', nome: 'Colecionador Pro', descricao: 'Coletou 50+ objetos em uma partida' }
];

let conquistasDesbloqueadas = [];

function inicializarConquistas() {
    // Carrega conquistas salvas
    const salvas = localStorage.getItem('agrinho-conquistas');
    if (salvas) {
        try {
            conquistasDesbloqueadas = JSON.parse(salvas);
        } catch (e) {
            conquistasDesbloqueadas = [];
        }
    }

    // Marca conquista de visitante automaticamente
    desbloquearConquista('visitante');

    // Verifica conquista de explorador (visitou todas as páginas)
    verificarExplorador();

    // Renderiza painel se existir
    renderizarPainelConquistas();

    // Eventos para desbloquear conquistas em interações
    rastrearInteracoes();
}

function desbloquearConquista(id) {
    if (conquistasDesbloqueadas.indexOf(id) !== -1) {
        return;
    }

    conquistasDesbloqueadas.push(id);
    localStorage.setItem('agrinho-conquistas', JSON.stringify(conquistasDesbloqueadas));

    const conquista = conquistasDisponiveis.find(function(c) { return c.id === id; });
    if (conquista) {
        exibirNotificacaoConquista(conquista);
    }

    // Re-renderiza painel se existir
    renderizarPainelConquistas();

    // Verifica conquista de colecionador
    if (conquistasDesbloqueadas.length >= 5 && id !== 'colecionador') {
        setTimeout(function() {
            desbloquearConquista('colecionador');
        }, 3500);
    }
}

function exibirNotificacaoConquista(conquista) {
    // Remove notificação anterior se existir
    let notif = document.getElementById('notifConquista');
    if (notif) {
        notif.parentNode.removeChild(notif);
    }

    // Cria nova notificação
    notif = document.createElement('div');
    notif.id = 'notifConquista';
    notif.className = 'notificacao-conquista';
    notif.setAttribute('role', 'status');
    notif.innerHTML = '<div class="icone">' + conquista.icone + '</div>' +
        '<div class="texto">' +
            '<strong>🎉 Conquista desbloqueada!</strong>' +
            '<p>' + conquista.nome + '</p>' +
        '</div>';

    document.body.appendChild(notif);

    // Anima entrada
    setTimeout(function() {
        notif.classList.add('exibida');
    }, 100);

    // Remove após 4 segundos
    setTimeout(function() {
        notif.classList.remove('exibida');
        setTimeout(function() {
            if (notif.parentNode) {
                notif.parentNode.removeChild(notif);
            }
        }, 600);
    }, 4000);
}

function renderizarPainelConquistas() {
    const grid = document.getElementById('gridConquistas');
    const progresso = document.getElementById('conquistasProgresso');

    if (!grid) {
        return;
    }

    grid.innerHTML = '';

    conquistasDisponiveis.forEach(function(conquista) {
        const desbloqueada = conquistasDesbloqueadas.indexOf(conquista.id) !== -1;
        const div = document.createElement('div');
        div.className = 'conquista' + (desbloqueada ? ' desbloqueada' : '');
        div.title = desbloqueada ? conquista.descricao : 'Bloqueada — ' + conquista.descricao;
        div.innerHTML = '<div class="conquista-icone">' + (desbloqueada ? conquista.icone : '🔒') + '</div>' +
            '<div class="conquista-nome">' + conquista.nome + '</div>' +
            '<div class="conquista-descricao">' + conquista.descricao + '</div>';
        grid.appendChild(div);
    });

    if (progresso) {
        progresso.textContent = conquistasDesbloqueadas.length + ' / ' + conquistasDisponiveis.length;
    }
}

function rastrearInteracoes() {
    // Identifica página atual
    const caminho = window.location.pathname;
    const arquivo = caminho.substring(caminho.lastIndexOf('/') + 1);

    // Salva páginas visitadas
    let visitadas = [];
    const salvas = localStorage.getItem('agrinho-paginas-visitadas');
    if (salvas) {
        try {
            visitadas = JSON.parse(salvas);
        } catch (e) {
            visitadas = [];
        }
    }

    if (visitadas.indexOf(arquivo) === -1) {
        visitadas.push(arquivo);
        localStorage.setItem('agrinho-paginas-visitadas', JSON.stringify(visitadas));
    }

    // Conquistas específicas por página
    if (arquivo === 'glossario.html' || arquivo.includes('glossario')) {
        desbloquearConquista('estudante');
    }
}

function verificarExplorador() {
    const paginasNecessarias = ['index.html', 'sobre.html', 'praticas.html', 'simulador.html', 'quiz.html', 'glossario.html', 'contato.html'];
    const visitadas = JSON.parse(localStorage.getItem('agrinho-paginas-visitadas') || '[]');

    const visitouTodas = paginasNecessarias.every(function(p) {
        return visitadas.indexOf(p) !== -1 || (p === 'index.html' && visitadas.indexOf('') !== -1);
    });

    if (visitouTodas) {
        desbloquearConquista('explorador');
    }
}

/* ============================================
   18. CARROSSEL DE HISTORIAS
   ============================================ */

let estadoCarrossel = {
    indiceAtual: 0,
    totalSlides: 0,
    intervalAuto: null
};

function inicializarCarrossel() {
    const trilho = document.getElementById('carrosselTrilho');
    const botaoAnterior = document.getElementById('carrosselAnterior');
    const botaoProximo = document.getElementById('carrosselProximo');
    const pontos = document.querySelectorAll('.carrossel-ponto');

    if (!trilho) {
        return;
    }

    estadoCarrossel.totalSlides = trilho.children.length;

    if (botaoAnterior) {
        botaoAnterior.addEventListener('click', function() {
            mudarSlide(-1);
            reiniciarAutoplay();
        });
    }

    if (botaoProximo) {
        botaoProximo.addEventListener('click', function() {
            mudarSlide(1);
            reiniciarAutoplay();
        });
    }

    pontos.forEach(function(ponto, indice) {
        ponto.addEventListener('click', function() {
            irParaSlide(indice);
            reiniciarAutoplay();
        });
    });

    // Autoplay
    iniciarAutoplay();

    // Pausa autoplay quando o cursor está em cima
    const carrossel = document.querySelector('.carrossel-historias');
    if (carrossel) {
        carrossel.addEventListener('mouseenter', pararAutoplay);
        carrossel.addEventListener('mouseleave', iniciarAutoplay);
    }
}

function mudarSlide(direcao) {
    const novoIndice = estadoCarrossel.indiceAtual + direcao;

    if (novoIndice < 0) {
        irParaSlide(estadoCarrossel.totalSlides - 1);
    } else if (novoIndice >= estadoCarrossel.totalSlides) {
        irParaSlide(0);
    } else {
        irParaSlide(novoIndice);
    }
}

function irParaSlide(indice) {
    const trilho = document.getElementById('carrosselTrilho');
    if (!trilho) return;

    estadoCarrossel.indiceAtual = indice;
    trilho.style.transform = 'translateX(-' + (indice * 100) + '%)';

    // Atualiza pontos
    document.querySelectorAll('.carrossel-ponto').forEach(function(ponto, i) {
        if (i === indice) {
            ponto.classList.add('ativo');
        } else {
            ponto.classList.remove('ativo');
        }
    });
}

function iniciarAutoplay() {
    pararAutoplay();
    estadoCarrossel.intervalAuto = setInterval(function() {
        mudarSlide(1);
    }, 6000);
}

function pararAutoplay() {
    if (estadoCarrossel.intervalAuto) {
        clearInterval(estadoCarrossel.intervalAuto);
        estadoCarrossel.intervalAuto = null;
    }
}

function reiniciarAutoplay() {
    iniciarAutoplay();
}

/* ============================================
   19. COMPARADOR ANTES/DEPOIS
   ============================================
   Slider interativo que mostra dois cenários sobrepostos:
     - Camada "antes" (fundo): solo degradado, sempre visível
     - Camada "depois" (topo): solo restaurado, com clip-path
   Conforme o usuário arrasta, a clip-path do "depois" muda,
   revelando mais ou menos do cenário restaurado.
   Implementação:
     - Eventos de mouse (mousedown/mousemove/mouseup)
     - Eventos de toque equivalentes (touchstart/move/end)
     - Input range invisível para acessibilidade por teclado
     - Animação pulsante no handle até primeira interação
   ============================================ */

function inicializarComparador() {
    const comparador = document.querySelector('.comparador');
    const input = document.getElementById('comparadorInput');
    const depois = document.getElementById('comparadorDepois');
    const divisor = document.getElementById('comparadorDivisor');
    const handle = document.getElementById('comparadorHandle');

    if (!comparador || !depois) {
        return;
    }

    let arrastando = false;

    // Atualiza a posição do divisor, handle e clip-path
    function atualizarPosicao(porcentagem) {
        // Limita entre 0 e 100
        porcentagem = Math.max(0, Math.min(100, porcentagem));

        // Esconde a parte esquerda do "depois" até a porcentagem indicada
        // Resultado: "antes" à esquerda do divisor, "depois" à direita
        depois.style.clipPath = 'inset(0 0 0 ' + porcentagem + '%)';

        if (divisor) {
            divisor.style.left = porcentagem + '%';
        }
        if (handle) {
            handle.style.left = porcentagem + '%';
        }
        if (input) {
            input.value = porcentagem;
        }
    }

    // Converte posição X (relativa à viewport) em porcentagem (0-100) do comparador
    function obterPorcentagem(clienteX) {
        const rect = comparador.getBoundingClientRect();
        const x = clienteX - rect.left;
        return (x / rect.width) * 100;
    }

    // ===== MOUSE =====
    comparador.addEventListener('mousedown', function(evento) {
        arrastando = true;
        comparador.classList.add('interagido');
        atualizarPosicao(obterPorcentagem(evento.clientX));
        evento.preventDefault();
    });

    document.addEventListener('mousemove', function(evento) {
        if (!arrastando) return;
        atualizarPosicao(obterPorcentagem(evento.clientX));
    });

    document.addEventListener('mouseup', function() {
        arrastando = false;
    });

    // Mouse sai da janela durante arraste
    document.addEventListener('mouseleave', function() {
        arrastando = false;
    });

    // ===== TOUCH (mobile) =====
    comparador.addEventListener('touchstart', function(evento) {
        if (evento.touches.length === 0) return;
        arrastando = true;
        comparador.classList.add('interagido');
        atualizarPosicao(obterPorcentagem(evento.touches[0].clientX));
    }, { passive: true });

    document.addEventListener('touchmove', function(evento) {
        if (!arrastando || evento.touches.length === 0) return;
        atualizarPosicao(obterPorcentagem(evento.touches[0].clientX));
    }, { passive: true });

    document.addEventListener('touchend', function() {
        arrastando = false;
    });

    document.addEventListener('touchcancel', function() {
        arrastando = false;
    });

    // ===== TECLADO (acessibilidade) =====
    if (input) {
        input.addEventListener('input', function() {
            atualizarPosicao(parseFloat(input.value));
        });
    }

    // Posição inicial
    atualizarPosicao(50);
}

/* ============================================
   20. JOGO "DEFENSOR DO AGRO"
   ============================================
   Mini-jogo educativo onde objetos caem do topo da tela
   e o usuário precisa CLICAR rapidamente:
     - Objetos sustentáveis (verdes) → ganha pontos
     - Objetos danosos (vermelhos) → perde pontos
     - Power-ups raros (5% chance) → bônus especiais
   Recursos avançados implementados:
     - 3 níveis de dificuldade (velocidade + tempo + vidas)
     - Sistema de combos com multiplicador até 5x
     - Sons gerados via Web Audio API (sem arquivos)
     - Partículas visuais com CSS animations
     - Ranking Top 5 salvo em localStorage
     - Pausa por tecla P/Espaço ou botão
     - Suporte completo a toque (mobile)
   ============================================ */

const objetosBons = [
    { emoji: '🌱', pontos: 10, nome: 'Muda' },
    { emoji: '💧', pontos: 10, nome: 'Gota d\'água' },
    { emoji: '🌳', pontos: 15, nome: 'Árvore' },
    { emoji: '🐝', pontos: 15, nome: 'Abelha' },
    { emoji: '☀️', pontos: 10, nome: 'Sol' },
    { emoji: '🌾', pontos: 10, nome: 'Trigo' },
    { emoji: '🌻', pontos: 12, nome: 'Girassol' },
    { emoji: '🐞', pontos: 15, nome: 'Joaninha' },
    { emoji: '🌽', pontos: 12, nome: 'Milho' },
    { emoji: '🥬', pontos: 12, nome: 'Alface' },
    { emoji: '🍅', pontos: 14, nome: 'Tomate' }
];

const objetosMaus = [
    { emoji: '🔥', pontos: -20, nome: 'Queimada' },
    { emoji: '🪓', pontos: -20, nome: 'Desmatamento' },
    { emoji: '☠️', pontos: -25, nome: 'Veneno' },
    { emoji: '🛢️', pontos: -15, nome: 'Poluição' },
    { emoji: '🗑️', pontos: -15, nome: 'Lixo' },
    { emoji: '💨', pontos: -18, nome: 'Erosão' },
    { emoji: '⛈️', pontos: -22, nome: 'Tempestade' }
];

// Power-ups especiais (raros)
const powerUps = [
    { id: 'estrela', emoji: '⭐', nome: 'Pontos x2', cor: '#d4a017', duracao: 5 },
    { id: 'relogio', emoji: '⏱️', nome: 'Lentidão', cor: '#5fb3e3', duracao: 5 },
    { id: 'coracao', emoji: '💖', nome: 'Vida extra', cor: '#e74c3c', duracao: 0 },
    { id: 'escudo', emoji: '🛡️', nome: 'Escudo', cor: '#3498db', duracao: 5 }
];

// Configurações de dificuldade
const dificuldades = {
    facil: { velocidade: 2.0, intervaloSpawn: 1500, tempoInicial: 90, vidas: 3, nome: 'Fácil' },
    medio: { velocidade: 2.5, intervaloSpawn: 1200, tempoInicial: 60, vidas: 3, nome: 'Médio' },
    dificil: { velocidade: 3.5, intervaloSpawn: 800, tempoInicial: 45, vidas: 2, nome: 'Difícil' }
};

let estadoJogo = {
    pontuacao: 0,
    vidas: 3,
    tempo: 60,
    ativo: false,
    pausado: false,
    objetos: [],
    intervaloSpawn: null,
    intervaloTempo: null,
    intervaloAtualizacao: null,
    intervaloBossWave: null,
    velocidade: 2.5,
    velocidadeBase: 2.5,
    melhorPontuacao: 0,
    dificuldade: 'medio',
    modoEndless: false,
    combo: 0,
    comboMaximo: 0,
    multiplicador: 1,
    powerUpsAtivos: {},
    audioContext: null,
    somAtivo: true,
    // Estatísticas da partida (Opção A)
    objetosColetados: 0,
    tempoTotalJogado: 0,
    inicioPartida: 0,
    // Boss wave (Opção C)
    bossWaveAtiva: false
};

function inicializarJogo() {
    const botaoIniciar = document.getElementById('botaoIniciarJogo');
    const botaoReiniciarJogo = document.getElementById('botaoReiniciarJogo');

    if (!botaoIniciar) {
        return;
    }

    // Carrega melhor pontuação salva
    const melhor = localStorage.getItem('agrinho-melhor-pontuacao-jogo');
    if (melhor) {
        estadoJogo.melhorPontuacao = parseInt(melhor, 10);
        const elemento = document.getElementById('melhorPontuacao');
        if (elemento) {
            elemento.textContent = estadoJogo.melhorPontuacao;
        }
    }

    botaoIniciar.addEventListener('click', iniciarJogo);

    if (botaoReiniciarJogo) {
        botaoReiniciarJogo.addEventListener('click', iniciarJogo);
    }

    // Botões de dificuldade
    const botoesDificuldade = document.querySelectorAll('.botao-dificuldade');
    botoesDificuldade.forEach(function(botao) {
        botao.addEventListener('click', function() {
            botoesDificuldade.forEach(function(b) { b.classList.remove('selecionada'); });
            botao.classList.add('selecionada');
            estadoJogo.dificuldade = botao.dataset.dificuldade;
        });
    });

    // Toggle do modo Endless (Opção C)
    const botaoEndless = document.getElementById('botaoModoEndless');
    if (botaoEndless) {
        botaoEndless.addEventListener('click', function() {
            estadoJogo.modoEndless = !estadoJogo.modoEndless;
            if (estadoJogo.modoEndless) {
                botaoEndless.classList.add('selecionada');
                botaoEndless.setAttribute('aria-pressed', 'true');
            } else {
                botaoEndless.classList.remove('selecionada');
                botaoEndless.setAttribute('aria-pressed', 'false');
            }
        });
    }

    // Botão de "Refazer mesma dificuldade rápido" (Opção A)
    const botaoRefazerRapido = document.getElementById('botaoRefazerRapido');
    if (botaoRefazerRapido) {
        botaoRefazerRapido.addEventListener('click', iniciarJogo);
    }

    // Botão de pausa
    const botaoPausar = document.getElementById('botaoPausarJogo');
    if (botaoPausar) {
        botaoPausar.addEventListener('click', alternarPausa);
    }

    // Carrega preferência de som
    const somSalvo = localStorage.getItem('agrinho-som-jogo');
    if (somSalvo === 'desligado') {
        estadoJogo.somAtivo = false;
    }
    atualizarBotaoMute();

    // Botão de mute
    const botaoMute = document.getElementById('botaoMuteJogo');
    if (botaoMute) {
        botaoMute.addEventListener('click', alternarMute);
    }

    // Tecla de pausa (P ou ESPAÇO)
    document.addEventListener('keydown', function(evento) {
        if (estadoJogo.ativo && (evento.key === 'p' || evento.key === 'P' || evento.code === 'Space')) {
            evento.preventDefault();
            alternarPausa();
        }
    });

    // Renderiza ranking salvo
    renderizarRanking();
}

// Web Audio API - efeitos sonoros gerados (sem arquivos externos)
function tocarSom(tipo) {
    // Verifica se o som está habilitado
    if (!estadoJogo.somAtivo) return;

    try {
        if (!estadoJogo.audioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            estadoJogo.audioContext = new AudioContext();
        }

        const contexto = estadoJogo.audioContext;
        const oscilador = contexto.createOscillator();
        const ganho = contexto.createGain();

        oscilador.connect(ganho);
        ganho.connect(contexto.destination);

        // Configurações diferentes para cada tipo de som
        switch (tipo) {
            case 'coletar':
                oscilador.frequency.setValueAtTime(800, contexto.currentTime);
                oscilador.frequency.exponentialRampToValueAtTime(1200, contexto.currentTime + 0.1);
                ganho.gain.setValueAtTime(0.2, contexto.currentTime);
                ganho.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 0.15);
                oscilador.start(contexto.currentTime);
                oscilador.stop(contexto.currentTime + 0.15);
                break;
            case 'errar':
                oscilador.type = 'sawtooth';
                oscilador.frequency.setValueAtTime(200, contexto.currentTime);
                oscilador.frequency.exponentialRampToValueAtTime(100, contexto.currentTime + 0.2);
                ganho.gain.setValueAtTime(0.15, contexto.currentTime);
                ganho.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 0.2);
                oscilador.start(contexto.currentTime);
                oscilador.stop(contexto.currentTime + 0.2);
                break;
            case 'powerup':
                oscilador.frequency.setValueAtTime(400, contexto.currentTime);
                oscilador.frequency.exponentialRampToValueAtTime(1600, contexto.currentTime + 0.3);
                ganho.gain.setValueAtTime(0.25, contexto.currentTime);
                ganho.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 0.4);
                oscilador.start(contexto.currentTime);
                oscilador.stop(contexto.currentTime + 0.4);
                break;
            case 'fim':
                oscilador.type = 'triangle';
                oscilador.frequency.setValueAtTime(400, contexto.currentTime);
                oscilador.frequency.exponentialRampToValueAtTime(100, contexto.currentTime + 0.6);
                ganho.gain.setValueAtTime(0.2, contexto.currentTime);
                ganho.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 0.6);
                oscilador.start(contexto.currentTime);
                oscilador.stop(contexto.currentTime + 0.6);
                break;
            case 'combo':
                oscilador.frequency.setValueAtTime(1000, contexto.currentTime);
                oscilador.frequency.setValueAtTime(1400, contexto.currentTime + 0.08);
                ganho.gain.setValueAtTime(0.2, contexto.currentTime);
                ganho.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 0.2);
                oscilador.start(contexto.currentTime);
                oscilador.stop(contexto.currentTime + 0.2);
                break;
        }
    } catch (e) {
        // Falha silenciosa - sons são opcionais
    }
}

function iniciarJogo() {
    // Aplica configurações de dificuldade
    const config = dificuldades[estadoJogo.dificuldade];

    // Reset estado
    estadoJogo.pontuacao = 0;
    estadoJogo.vidas = config.vidas;
    // Modo endless: tempo infinito (representado por -1 para mostrar ∞)
    estadoJogo.tempo = estadoJogo.modoEndless ? -1 : config.tempoInicial;
    estadoJogo.ativo = true;
    estadoJogo.pausado = false;
    estadoJogo.objetos = [];
    estadoJogo.velocidade = config.velocidade;
    estadoJogo.velocidadeBase = config.velocidade;
    estadoJogo.combo = 0;
    estadoJogo.comboMaximo = 0;
    estadoJogo.multiplicador = 1;
    estadoJogo.powerUpsAtivos = {};
    // Reset estatísticas (Opção A)
    estadoJogo.objetosColetados = 0;
    estadoJogo.tempoTotalJogado = 0;
    estadoJogo.inicioPartida = Date.now();
    estadoJogo.bossWaveAtiva = false;

    // Limpa área do jogo
    const area = document.getElementById('areaJogo');
    if (area) {
        // Remove todos os objetos antigos mas mantém overlays
        const objetos = area.querySelectorAll('.objeto-jogo, .efeito-pontos, .particula');
        objetos.forEach(function(obj) {
            obj.parentNode.removeChild(obj);
        });
    }

    atualizarUIJogo();
    atualizarIndicadorCombo();
    atualizarIndicadoresPowerUps();
    esconderOverlays();

    // Mostra botão de pausa
    const botaoPausar = document.getElementById('botaoPausarJogo');
    if (botaoPausar) {
        botaoPausar.classList.remove('oculto');
    }

    // Contador de partidas do jogo
    if (typeof incrementarContador === 'function') {
        incrementarContador('agrinho-total-jogos');
    }

    // Marca conquista
    desbloquearConquista('guardiao');

    // Inicia loops do jogo
    iniciarSpawn();
    iniciarContagemTempo();
    iniciarAtualizacaoObjetos();
    iniciarBossWaves();
}

// ============================================
// BOSS WAVES — Onda especial a cada 15 segundos
// ============================================
// A cada 15s, uma "chuva" de 5 objetos cai junta.
// Cria momentos de alta intensidade no jogo.
function iniciarBossWaves() {
    pararBossWaves();

    estadoJogo.intervaloBossWave = setInterval(function() {
        if (!estadoJogo.ativo || estadoJogo.pausado) return;
        dispararBossWave();
    }, 15000);
}

function pararBossWaves() {
    if (estadoJogo.intervaloBossWave) {
        clearInterval(estadoJogo.intervaloBossWave);
        estadoJogo.intervaloBossWave = null;
    }
}

function dispararBossWave() {
    if (!estadoJogo.ativo) return;

    estadoJogo.bossWaveAtiva = true;

    // Exibe alerta visual
    mostrarAlertaBossWave();

    // Spawna 5 objetos rapidamente (intervalos de 300ms)
    let contador = 0;
    const intervaloRapido = setInterval(function() {
        if (contador >= 5 || !estadoJogo.ativo) {
            clearInterval(intervaloRapido);
            estadoJogo.bossWaveAtiva = false;
            return;
        }
        spawnObjeto();
        contador += 1;
    }, 300);
}

function mostrarAlertaBossWave() {
    const area = document.getElementById('areaJogo');
    if (!area) return;

    const alerta = document.createElement('div');
    alerta.className = 'alerta-boss-wave';
    alerta.textContent = '⚡ CHUVA DE OBJETOS! ⚡';
    alerta.setAttribute('aria-live', 'polite');
    area.appendChild(alerta);

    setTimeout(function() {
        if (alerta.parentNode) {
            alerta.parentNode.removeChild(alerta);
        }
    }, 1500);
}

function alternarPausa() {
    if (!estadoJogo.ativo) return;

    estadoJogo.pausado = !estadoJogo.pausado;

    const overlayPausa = document.getElementById('overlayPausa');
    if (overlayPausa) {
        if (estadoJogo.pausado) {
            overlayPausa.classList.remove('oculto');
        } else {
            overlayPausa.classList.add('oculto');
        }
    }
}

// Alterna o som do jogo
function alternarMute() {
    estadoJogo.somAtivo = !estadoJogo.somAtivo;
    localStorage.setItem('agrinho-som-jogo', estadoJogo.somAtivo ? 'ligado' : 'desligado');
    atualizarBotaoMute();

    // Toca um beep curto pra confirmar quando liga o som
    if (estadoJogo.somAtivo) {
        tocarSom('coletar');
    }
}

function atualizarBotaoMute() {
    const botao = document.getElementById('botaoMuteJogo');
    if (!botao) return;

    if (estadoJogo.somAtivo) {
        botao.textContent = '🔊';
        botao.title = 'Desativar som';
        botao.setAttribute('aria-label', 'Desativar som do jogo');
        botao.classList.remove('mutado');
    } else {
        botao.textContent = '🔇';
        botao.title = 'Ativar som';
        botao.setAttribute('aria-label', 'Ativar som do jogo');
        botao.classList.add('mutado');
    }
}

function iniciarSpawn() {
    pararSpawn();

    const config = dificuldades[estadoJogo.dificuldade];
    estadoJogo.intervaloSpawn = setInterval(function() {
        if (!estadoJogo.ativo || estadoJogo.pausado) return;
        spawnObjeto();
    }, config.intervaloSpawn);
}

function pararSpawn() {
    if (estadoJogo.intervaloSpawn) {
        clearInterval(estadoJogo.intervaloSpawn);
        estadoJogo.intervaloSpawn = null;
    }
}

function spawnObjeto() {
    const area = document.getElementById('areaJogo');
    if (!area) return;

    // 5% de chance de spawnar um power-up
    const sorteioPowerUp = Math.random() < 0.05;

    let dados, ehBom, ehPowerUp = false;

    if (sorteioPowerUp) {
        // Spawna um power-up
        const pu = powerUps[Math.floor(Math.random() * powerUps.length)];
        dados = { emoji: pu.emoji, pontos: 0, nome: pu.nome, powerUpId: pu.id };
        ehBom = true;
        ehPowerUp = true;
    } else {
        // 70% chance de objeto bom, 30% de objeto ruim
        ehBom = Math.random() < 0.7;
        const lista = ehBom ? objetosBons : objetosMaus;
        dados = lista[Math.floor(Math.random() * lista.length)];
    }

    const elemento = document.createElement('div');
    elemento.className = 'objeto-jogo';
    if (ehPowerUp) elemento.classList.add('powerup');
    elemento.textContent = dados.emoji;
    elemento.dataset.pontos = dados.pontos;
    elemento.dataset.bom = ehBom;
    elemento.dataset.powerUp = ehPowerUp;
    elemento.setAttribute('aria-label', dados.nome);
    elemento.setAttribute('role', 'button');
    elemento.setAttribute('tabindex', '-1');

    // Posição inicial aleatória no topo
    const areaWidth = area.offsetWidth;
    const x = Math.random() * (areaWidth - 50);
    elemento.style.left = x + 'px';
    elemento.style.top = '-50px';

    function manipuladorClique(e) {
        e.preventDefault();
        coletarObjeto(elemento, dados, ehBom, ehPowerUp);
    }

    elemento.addEventListener('click', manipuladorClique);
    // Suporte a toque
    elemento.addEventListener('touchstart', manipuladorClique, { passive: false });

    area.appendChild(elemento);
    estadoJogo.objetos.push({ elemento: elemento, y: -50, x: x, bom: ehBom, powerUp: ehPowerUp });
}

function coletarObjeto(elemento, dados, ehBom, ehPowerUp) {
    if (!estadoJogo.ativo || estadoJogo.pausado) return;
    if (elemento.classList.contains('coletado')) return;

    elemento.classList.add('coletado');

    // Coordenadas para partículas
    const left = parseFloat(elemento.style.left || 0);
    const top = parseFloat(elemento.style.top || 0);

    if (ehPowerUp) {
        // Power-up coletado
        ativarPowerUp(dados.powerUpId);
        criarParticulas(left, top, '#d4a017', 12);
        tocarSom('powerup');
    } else if (ehBom) {
        // Objeto bom: aumenta combo
        estadoJogo.combo += 1;
        // Rastreia combo máximo da partida (Opção A — stats extras)
        if (estadoJogo.combo > estadoJogo.comboMaximo) {
            estadoJogo.comboMaximo = estadoJogo.combo;
        }
        // Conquista "Combo Mestre" — combo de 20+
        if (estadoJogo.combo >= 20 && typeof desbloquearConquista === 'function') {
            desbloquearConquista('combo-mestre');
        }
        atualizarMultiplicador();

        // Conta objeto coletado (Opção A)
        estadoJogo.objetosColetados += 1;
        // Conquista "Colecionador Pro" — 50+ objetos
        if (estadoJogo.objetosColetados >= 50 && typeof desbloquearConquista === 'function') {
            desbloquearConquista('colecionador-pro');
        }

        // Pontos com multiplicador e power-up de pontos
        let pontosGanhos = dados.pontos * estadoJogo.multiplicador;
        if (estadoJogo.powerUpsAtivos.estrela) {
            pontosGanhos *= 2;
        }
        estadoJogo.pontuacao += pontosGanhos;

        mostrarEfeitoPontos(elemento, pontosGanhos, true);
        criarParticulas(left, top, '#4f9d50', 8);
        tocarSom(estadoJogo.combo >= 3 ? 'combo' : 'coletar');
    } else {
        // Objeto ruim: verifica se o ESCUDO está ativo
        if (estadoJogo.powerUpsAtivos.escudo) {
            // Escudo bloqueia o dano! Não perde pontos, não zera combo
            mostrarEfeitoPontos(elemento, 0, true);
            criarParticulas(left, top, '#3498db', 10);
            tocarSom('coletar');
        } else {
            // Sem escudo: zera combo, retira pontos
            estadoJogo.combo = 0;
            atualizarMultiplicador();
            estadoJogo.pontuacao += dados.pontos;
            if (estadoJogo.pontuacao < 0) estadoJogo.pontuacao = 0;

            mostrarEfeitoPontos(elemento, dados.pontos, false);
            criarParticulas(left, top, '#c0392b', 6);
            tocarSom('errar');
        }
    }

    // Remove objeto da lista após animação
    setTimeout(function() {
        const indice = estadoJogo.objetos.findIndex(function(o) { return o.elemento === elemento; });
        if (indice !== -1) {
            estadoJogo.objetos.splice(indice, 1);
        }
        if (elemento.parentNode) {
            elemento.parentNode.removeChild(elemento);
        }
    }, 400);

    atualizarUIJogo();
    atualizarIndicadorCombo();
}

function atualizarMultiplicador() {
    if (estadoJogo.combo >= 10) {
        estadoJogo.multiplicador = 5;
    } else if (estadoJogo.combo >= 5) {
        estadoJogo.multiplicador = 3;
    } else if (estadoJogo.combo >= 3) {
        estadoJogo.multiplicador = 2;
    } else {
        estadoJogo.multiplicador = 1;
    }
}

function atualizarIndicadorCombo() {
    const indicador = document.getElementById('indicadorCombo');
    if (!indicador) return;

    if (estadoJogo.combo >= 3) {
        indicador.classList.add('visivel');
        indicador.textContent = '🔥 Combo x' + estadoJogo.combo + ' (' + estadoJogo.multiplicador + 'x pontos!)';

        if (estadoJogo.combo >= 10) {
            indicador.classList.add('mega');
        } else {
            indicador.classList.remove('mega');
        }
    } else {
        indicador.classList.remove('visivel', 'mega');
    }
}

function ativarPowerUp(id) {
    const pu = powerUps.find(function(p) { return p.id === id; });
    if (!pu) return;

    if (id === 'coracao') {
        // Vida extra (até 5 vidas)
        if (estadoJogo.vidas < 5) {
            estadoJogo.vidas += 1;
        }
    } else if (id === 'relogio') {
        // Lentidão
        estadoJogo.velocidade = estadoJogo.velocidadeBase * 0.5;
        estadoJogo.powerUpsAtivos.relogio = pu.duracao;
    } else if (id === 'estrela') {
        // Pontos x2
        estadoJogo.powerUpsAtivos.estrela = pu.duracao;
    } else if (id === 'escudo') {
        // Escudo: bloqueia danos de objetos ruins por 5s
        estadoJogo.powerUpsAtivos.escudo = pu.duracao;
    }

    atualizarIndicadoresPowerUps();
}

function atualizarIndicadoresPowerUps() {
    const barra = document.getElementById('barraPowerUps');
    if (!barra) return;

    barra.innerHTML = '';

    Object.keys(estadoJogo.powerUpsAtivos).forEach(function(id) {
        const tempoRestante = estadoJogo.powerUpsAtivos[id];
        if (tempoRestante <= 0) return;

        const pu = powerUps.find(function(p) { return p.id === id; });
        if (!pu) return;

        const div = document.createElement('div');
        div.className = 'indicador-powerup';
        // data-pu permite CSS específico por tipo de power-up (ex: escudo azul)
        div.setAttribute('data-pu', id);
        div.innerHTML = '<span class="emoji">' + pu.emoji + '</span>' +
            '<span>' + pu.nome + '</span>' +
            '<span class="tempo">' + tempoRestante + 's</span>';
        barra.appendChild(div);
    });

    // Adiciona/remove classe 'escudo-ativo' no body para efeito visual global
    if (estadoJogo.powerUpsAtivos.escudo) {
        document.body.classList.add('escudo-ativo');
    } else {
        document.body.classList.remove('escudo-ativo');
    }
}

function criarParticulas(x, y, cor, quantidade) {
    const area = document.getElementById('areaJogo');
    if (!area) return;

    for (let i = 0; i < quantidade; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula';
        particula.style.backgroundColor = cor;
        particula.style.left = (x + 20) + 'px';
        particula.style.top = (y + 20) + 'px';

        // Direção aleatória
        const angulo = (Math.PI * 2 * i) / quantidade + Math.random() * 0.5;
        const distancia = 30 + Math.random() * 30;
        particula.style.setProperty('--dx', Math.cos(angulo) * distancia + 'px');
        particula.style.setProperty('--dy', Math.sin(angulo) * distancia + 'px');

        area.appendChild(particula);

        setTimeout(function() {
            if (particula.parentNode) {
                particula.parentNode.removeChild(particula);
            }
        }, 900);
    }
}

function mostrarEfeitoPontos(elemento, pontos, ehBom) {
    const area = document.getElementById('areaJogo');
    if (!area) return;

    const efeito = document.createElement('div');
    efeito.className = 'efeito-pontos ' + (pontos >= 0 ? 'positivo' : 'negativo');
    efeito.textContent = (pontos >= 0 ? '+' : '') + pontos;

    const left = parseFloat(elemento.style.left || 0);
    const top = parseFloat(elemento.style.top || 0);
    efeito.style.left = left + 'px';
    efeito.style.top = top + 'px';

    area.appendChild(efeito);

    setTimeout(function() {
        if (efeito.parentNode) {
            efeito.parentNode.removeChild(efeito);
        }
    }, 1000);
}

function iniciarContagemTempo() {
    pararTempo();

    estadoJogo.intervaloTempo = setInterval(function() {
        if (!estadoJogo.ativo || estadoJogo.pausado) return;

        // No modo endless o tempo SOBE em vez de descer (cronômetro)
        if (estadoJogo.modoEndless) {
            estadoJogo.tempoTotalJogado += 1;
            // Conquista "Maratonista" — 60s sobreviveu no endless
            if (estadoJogo.tempoTotalJogado >= 60 && typeof desbloquearConquista === 'function') {
                desbloquearConquista('maratonista');
            }
        } else {
            estadoJogo.tempo -= 1;
            estadoJogo.tempoTotalJogado += 1;
        }

        // Decrementa tempo de power-ups ativos
        Object.keys(estadoJogo.powerUpsAtivos).forEach(function(id) {
            estadoJogo.powerUpsAtivos[id] -= 1;
            if (estadoJogo.powerUpsAtivos[id] <= 0) {
                delete estadoJogo.powerUpsAtivos[id];
                // Restaura velocidade ao terminar lentidão
                if (id === 'relogio') {
                    estadoJogo.velocidade = estadoJogo.velocidadeBase;
                }
            }
        });
        atualizarIndicadoresPowerUps();

        // Aumenta velocidade gradualmente (apenas se não houver lentidão ativa)
        // No modo endless, baseado no tempo jogado (não no tempo restante)
        const tempoReferencia = estadoJogo.modoEndless ? estadoJogo.tempoTotalJogado : estadoJogo.tempo;
        if (tempoReferencia % 10 === 0 && !estadoJogo.powerUpsAtivos.relogio) {
            estadoJogo.velocidadeBase += 0.4;
            estadoJogo.velocidade = estadoJogo.velocidadeBase;
        }

        atualizarUIJogo();

        // Modo normal: termina por tempo. Modo endless: só termina por vidas.
        if (!estadoJogo.modoEndless && estadoJogo.tempo <= 0) {
            terminarJogo('tempo');
        }
    }, 1000);
}

function pararTempo() {
    if (estadoJogo.intervaloTempo) {
        clearInterval(estadoJogo.intervaloTempo);
        estadoJogo.intervaloTempo = null;
    }
}

function iniciarAtualizacaoObjetos() {
    pararAtualizacao();

    estadoJogo.intervaloAtualizacao = setInterval(function() {
        if (!estadoJogo.ativo || estadoJogo.pausado) return;
        atualizarPosicaoObjetos();
    }, 16);
}

function pararAtualizacao() {
    if (estadoJogo.intervaloAtualizacao) {
        clearInterval(estadoJogo.intervaloAtualizacao);
        estadoJogo.intervaloAtualizacao = null;
    }
}

function atualizarPosicaoObjetos() {
    const area = document.getElementById('areaJogo');
    if (!area) return;
    const altura = area.offsetHeight;

    estadoJogo.objetos.forEach(function(obj, indice) {
        if (!obj.elemento || obj.elemento.classList.contains('coletado')) return;

        obj.y += estadoJogo.velocidade;
        obj.elemento.style.top = obj.y + 'px';

        // Saiu da tela embaixo
        if (obj.y >= altura - 20) {
            // Se era objeto bom (não power-up), perde uma vida e zera combo
            if (obj.bom && !obj.powerUp) {
                estadoJogo.vidas -= 1;
                estadoJogo.combo = 0;
                atualizarMultiplicador();
                atualizarIndicadorCombo();
                atualizarUIJogo();
                tocarSom('errar');

                // OPCAO A: Vibração no celular ao perder vida (feedback tátil)
                // Vibrate API é nativa do navegador (não é framework)
                if ('vibrate' in navigator) {
                    try {
                        navigator.vibrate(200);
                    } catch (e) {
                        // Falha silenciosa - alguns navegadores podem bloquear
                    }
                }

                if (estadoJogo.vidas <= 0) {
                    terminarJogo('vidas');
                    return;
                }
            }

            // Remove
            if (obj.elemento.parentNode) {
                obj.elemento.parentNode.removeChild(obj.elemento);
            }
            estadoJogo.objetos.splice(indice, 1);
        }
    });
}

function atualizarUIJogo() {
    const pontuacaoEl = document.getElementById('jogoPontuacao');
    const tempoEl = document.getElementById('jogoTempo');
    const vidasEl = document.getElementById('jogoVidas');

    if (pontuacaoEl) {
        pontuacaoEl.textContent = estadoJogo.pontuacao;
    }
    if (tempoEl) {
        // Modo endless mostra cronômetro crescente; modo normal mostra contagem regressiva
        if (estadoJogo.modoEndless) {
            tempoEl.textContent = '∞ (' + estadoJogo.tempoTotalJogado + 's)';
        } else {
            tempoEl.textContent = estadoJogo.tempo + 's';
        }
    }
    if (vidasEl) {
        // Renderiza corações
        let html = '';
        for (let i = 0; i < 3; i++) {
            html += '<span class="coracao' + (i < estadoJogo.vidas ? '' : ' perdido') + '">❤️</span>';
        }
        vidasEl.innerHTML = html;
    }
}

function terminarJogo(motivo) {
    estadoJogo.ativo = false;
    estadoJogo.pausado = false;

    pararSpawn();
    pararTempo();
    pararAtualizacao();
    pararBossWaves();

    // ===== Conquistas exclusivas do jogo (Opção C) =====
    // "Milionário do Agro" — 500+ pontos em uma partida
    if (estadoJogo.pontuacao >= 500 && typeof desbloquearConquista === 'function') {
        desbloquearConquista('milionario');
    }
    // "Invencível" — venceu sem perder vidas (modo normal apenas)
    if (!estadoJogo.modoEndless && motivo === 'tempo' &&
        estadoJogo.vidas === dificuldades[estadoJogo.dificuldade].vidas &&
        typeof desbloquearConquista === 'function') {
        desbloquearConquista('invencivel');
    }

    // Esconde indicadores
    const indicadorCombo = document.getElementById('indicadorCombo');
    if (indicadorCombo) indicadorCombo.classList.remove('visivel', 'mega');

    const barraPowerUps = document.getElementById('barraPowerUps');
    if (barraPowerUps) barraPowerUps.innerHTML = '';

    const overlayPausa = document.getElementById('overlayPausa');
    if (overlayPausa) overlayPausa.classList.add('oculto');

    const botaoPausar = document.getElementById('botaoPausarJogo');
    if (botaoPausar) botaoPausar.classList.add('oculto');

    // Salva no ranking
    salvarRanking(estadoJogo.pontuacao);
    renderizarRanking();

    tocarSom('fim');

    // Remove objetos restantes
    const area = document.getElementById('areaJogo');
    if (area) {
        const objetos = area.querySelectorAll('.objeto-jogo');
        objetos.forEach(function(obj) {
            if (obj.parentNode) {
                obj.parentNode.removeChild(obj);
            }
        });
    }

    // Salva melhor pontuação
    if (estadoJogo.pontuacao > estadoJogo.melhorPontuacao) {
        estadoJogo.melhorPontuacao = estadoJogo.pontuacao;
        localStorage.setItem('agrinho-melhor-pontuacao-jogo', estadoJogo.melhorPontuacao);

        const melhorEl = document.getElementById('melhorPontuacao');
        if (melhorEl) {
            melhorEl.textContent = estadoJogo.melhorPontuacao;
        }
    }

    // Exibe overlay de fim
    const overlayFim = document.getElementById('overlayFim');
    const tituloFim = document.getElementById('tituloFim');
    const mensagemFim = document.getElementById('mensagemFim');
    const pontuacaoFinalJogo = document.getElementById('pontuacaoFinalJogo');

    if (overlayFim) {
        overlayFim.classList.remove('escondido');
    }

    // VITÓRIA = sobreviveu até o tempo acabar
    // DERROTA = perdeu todas as vidas
    const venceu = motivo === 'tempo';
    const vitoriaPerfeita = venceu && estadoJogo.vidas === dificuldades[estadoJogo.dificuldade].vidas;

    if (tituloFim) {
        if (vitoriaPerfeita) {
            tituloFim.textContent = '🏆 VITÓRIA PERFEITA!';
        } else if (venceu) {
            tituloFim.textContent = '🎉 Vitória! Você defendeu o agro!';
        } else {
            tituloFim.textContent = '💔 Suas defesas falharam!';
        }
    }

    if (mensagemFim) {
        let texto;
        if (vitoriaPerfeita) {
            texto = '🌟 INCRÍVEL! Você sobreviveu o tempo inteiro sem perder nenhuma vida! Mestre absoluto do agro sustentável.';
        } else if (venceu) {
            // Mensagens de vitória (sobreviveu ao tempo)
            if (estadoJogo.pontuacao >= 400) {
                texto = '🏆 Defensor lendário! Pontuação extraordinária protegendo o agro.';
            } else if (estadoJogo.pontuacao >= 250) {
                texto = '🌟 Excelente! Você defendeu o campo com louvor.';
            } else if (estadoJogo.pontuacao >= 150) {
                texto = '🌿 Muito bom! Você sobreviveu e protegeu a fazenda.';
            } else {
                texto = '🌱 Você sobreviveu! Tente fazer mais pontos da próxima vez.';
            }
        } else {
            // Mensagens de derrota (perdeu todas as vidas)
            if (estadoJogo.pontuacao >= 300) {
                texto = '🎖️ Mesmo perdendo as vidas, sua pontuação foi excelente! Tente sobreviver até o final!';
            } else if (estadoJogo.pontuacao >= 150) {
                texto = '🌱 Bom esforço! Foque em não deixar elementos verdes passarem.';
            } else if (estadoJogo.pontuacao >= 50) {
                texto = '💪 Continue tentando! Cuidado com os elementos vermelhos.';
            } else {
                texto = '🌾 Não desista! Clique nos elementos da natureza (verdes) antes que toquem o chão.';
            }
        }
        mensagemFim.textContent = texto;
    }

    if (pontuacaoFinalJogo) {
        pontuacaoFinalJogo.textContent = estadoJogo.pontuacao;
    }

    // ===== OPÇÃO A: Estatísticas extras da partida =====
    const elComboMax = document.getElementById('estatComboMax');
    const elObjetosColetados = document.getElementById('estatObjetosColetados');
    const elTempoJogado = document.getElementById('estatTempoJogado');
    if (elComboMax) elComboMax.textContent = estadoJogo.comboMaximo;
    if (elObjetosColetados) elObjetosColetados.textContent = estadoJogo.objetosColetados;
    if (elTempoJogado) {
        const mins = Math.floor(estadoJogo.tempoTotalJogado / 60);
        const segs = estadoJogo.tempoTotalJogado % 60;
        elTempoJogado.textContent = mins > 0
            ? mins + 'min ' + segs + 's'
            : segs + 's';
    }

    // CONFETE em qualquer vitória, ou em derrota com pontuação muito alta
    if ((venceu || estadoJogo.pontuacao >= 300) && typeof window.dispararConfete === 'function') {
        window.dispararConfete();
        // Segunda rajada para vitória perfeita
        if (vitoriaPerfeita) {
            setTimeout(window.dispararConfete, 800);
            setTimeout(window.dispararConfete, 1600);
        }
    }
}

function esconderOverlays() {
    const overlayInicio = document.getElementById('overlayInicio');
    const overlayFim = document.getElementById('overlayFim');
    const overlayPausa = document.getElementById('overlayPausa');

    if (overlayInicio) overlayInicio.classList.add('escondido');
    if (overlayFim) overlayFim.classList.add('escondido');
    if (overlayPausa) overlayPausa.classList.add('oculto');
}

// Salva pontuação no ranking local (top 5)
function salvarRanking(pontuacao) {
    if (pontuacao <= 0) return;

    let ranking = [];
    try {
        const salvo = localStorage.getItem('agrinho-ranking-jogo');
        if (salvo) {
            ranking = JSON.parse(salvo);
        }
    } catch (e) {
        ranking = [];
    }

    const data = new Date();
    const dataFormatada = data.getDate().toString().padStart(2, '0') + '/' +
        (data.getMonth() + 1).toString().padStart(2, '0');

    ranking.push({
        pontos: pontuacao,
        data: dataFormatada,
        dificuldade: dificuldades[estadoJogo.dificuldade].nome
    });

    // Ordena por pontos (decrescente) e mantém top 5
    ranking.sort(function(a, b) { return b.pontos - a.pontos; });
    ranking = ranking.slice(0, 5);

    localStorage.setItem('agrinho-ranking-jogo', JSON.stringify(ranking));
}

function renderizarRanking() {
    const container = document.getElementById('listaRanking');
    if (!container) return;

    let ranking = [];
    try {
        const salvo = localStorage.getItem('agrinho-ranking-jogo');
        if (salvo) {
            ranking = JSON.parse(salvo);
        }
    } catch (e) {
        ranking = [];
    }

    if (ranking.length === 0) {
        container.innerHTML = '<li class="ranking-vazio">Ainda não há recordes. Seja o primeiro!</li>';
        return;
    }

    const emojis = ['🥇', '🥈', '🥉', '🏅', '🏅'];
    let html = '';

    ranking.forEach(function(item, indice) {
        const classe = indice < 3 ? ' class="posicao-' + (indice + 1) + '"' : '';
        html += '<li' + classe + '>' +
            '<span><span class="posicao-emoji">' + emojis[indice] + '</span>' +
                '<strong>' + item.pontos + '</strong> pts ' +
                '<small>(' + item.dificuldade + ' · ' + item.data + ')</small>' +
            '</span>' +
            '<span class="ranking-pontos">#' + (indice + 1) + '</span>' +
        '</li>';
    });

    container.innerHTML = html;
}

/* ============================================
   21. RASTREADORES DE CONQUISTAS
   ============================================ */

function rastrearConquistasContextuais() {
    // Rastreia uso da calculadora
    const botaoCalcular = document.getElementById('botaoCalcular');
    if (botaoCalcular) {
        botaoCalcular.addEventListener('click', function() {
            desbloquearConquista('sustentavel');
        });
    }

    // Rastreia clique no mapa
    const regioes = document.querySelectorAll('.regiao-mapa');
    regioes.forEach(function(regiao) {
        regiao.addEventListener('click', function() {
            desbloquearConquista('curioso');
        });
    });

    // Rastreia uso do simulador
    const botaoFinalizar = document.getElementById('botaoFinalizar');
    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', function() {
            desbloquearConquista('fazendeiro');
        });
    }

    // Rastreia conclusão do quiz
    const botaoIniciarQuiz = document.getElementById('botaoIniciarQuiz');
    const botaoRefazer = document.getElementById('botaoRefazer');
    [botaoIniciarQuiz, botaoRefazer].forEach(function(btn) {
        if (btn) {
            btn.addEventListener('click', function() {
                // Marca conquista de aprendiz quando começa
                desbloquearConquista('aprendiz');
            });
        }
    });
}

// Hook na função do quiz para detectar 100%
const exibirResultadoOriginal = typeof exibirResultado === 'function' ? exibirResultado : null;

/* ============================================
   22a. ATALHOS DE TECLADO
   ============================================ */

function inicializarAtalhosTeclado() {
    document.addEventListener('keydown', function(evento) {
        // Ctrl+K abre a busca
        if ((evento.ctrlKey || evento.metaKey) && evento.key === 'k') {
            evento.preventDefault();
            const botaoBusca = document.getElementById('botaoBusca');
            if (botaoBusca) {
                botaoBusca.click();
            }
        }

        // Tecla "/" também abre a busca (estilo GitHub)
        if (evento.key === '/' && !estaDigitando(evento.target)) {
            evento.preventDefault();
            const botaoBusca = document.getElementById('botaoBusca');
            if (botaoBusca) {
                botaoBusca.click();
            }
        }

        // T alterna o tema
        if (evento.key === 't' && !estaDigitando(evento.target) && !evento.ctrlKey && !evento.metaKey) {
            const botaoTema = document.getElementById('botaoTema');
            if (botaoTema) {
                botaoTema.click();
            }
        }
    });
}

function estaDigitando(elemento) {
    if (!elemento) return false;
    const tag = elemento.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || elemento.isContentEditable;
}

/* ============================================
   22b. EASTER EGG - CODIGO KONAMI
   ============================================ */

const sequenciaKonami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let posicaoKonami = 0;

function inicializarKonami() {
    document.addEventListener('keydown', function(evento) {
        // Compara case insensitive para B e A
        const teclaEsperada = sequenciaKonami[posicaoKonami];
        const teclaPressionada = evento.key.length === 1 ? evento.key.toLowerCase() : evento.key;
        const esperadaNormalizada = teclaEsperada.length === 1 ? teclaEsperada.toLowerCase() : teclaEsperada;

        if (teclaPressionada === esperadaNormalizada) {
            posicaoKonami += 1;

            if (posicaoKonami === sequenciaKonami.length) {
                ativarModoKonami();
                posicaoKonami = 0;
            }
        } else {
            posicaoKonami = 0;
        }
    });
}

function ativarModoKonami() {
    document.body.classList.toggle('modo-konami');

    // Exibe notificação
    const notif = document.createElement('div');
    notif.className = 'notificacao-konami';

    if (document.body.classList.contains('modo-konami')) {
        notif.innerHTML = '🎉 MODO ESPECIAL ATIVADO! 🌈<br><span style="font-size: 1rem;">Use ↑↑↓↓←→←→BA de novo para desativar</span>';
    } else {
        notif.innerHTML = '🌱 Modo normal restaurado';
    }

    document.body.appendChild(notif);

    // Toca som especial
    if (typeof tocarSom === 'function') {
        tocarSom('powerup');
    }

    // Dispara confete
    if (typeof window.dispararConfete === 'function') {
        window.dispararConfete();
    }

    // Remove notificação após 3 segundos
    setTimeout(function() {
        if (notif.parentNode) {
            notif.parentNode.removeChild(notif);
        }
    }, 3000);
}

/* ============================================
   22. EFEITOS DE PARALLAX
   ============================================ */

function inicializarParallax() {
    const elementosParallax = document.querySelectorAll('[data-parallax]');

    if (elementosParallax.length === 0) {
        return;
    }

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        elementosParallax.forEach(function(elemento) {
            const velocidade = parseFloat(elemento.dataset.parallax) || 0.3;
            const offset = scrollY * velocidade;
            elemento.style.transform = 'translateY(' + offset + 'px)';
        });
    }, { passive: true });
}

/* ============================================
   23. SINTESE DE VOZ (QUIZ - ACESSIBILIDADE)
   ============================================
   Usa a Web Speech API (SpeechSynthesis) nativa do
   navegador para LER em voz alta as perguntas do quiz.
   Importante para acessibilidade de:
     - Pessoas com deficiência visual
     - Pessoas com dislexia ou dificuldade de leitura
     - Usuários que preferem áudio
   Recursos:
     - Detecta voz em português automaticamente
     - Botão visual indica estado (falando/parado)
     - Tecla ESC interrompe a leitura
     - Degradação graciosa: se API indisponível,
       botão fica desabilitado (sem quebrar nada)
   ============================================ */

let estadoVoz = {
    falando: false,
    utterance: null
};

function inicializarSinteseVoz() {
    // Verifica suporte do navegador
    if (!('speechSynthesis' in window)) {
        // Esconde o botão se não houver suporte
        const botao = document.getElementById('botaoOuvirPergunta');
        if (botao) {
            botao.classList.add('indisponivel');
            botao.disabled = true;
            botao.title = 'Seu navegador não suporta leitura em voz alta';
        }
        return;
    }

    const botao = document.getElementById('botaoOuvirPergunta');
    if (!botao) return;

    botao.addEventListener('click', function() {
        if (estadoVoz.falando) {
            pararFala();
        } else {
            const textoPergunta = document.getElementById('textoPergunta');
            if (textoPergunta) {
                falarTexto(textoPergunta.textContent);
            }
        }
    });

    // Para a fala ao trocar de pergunta
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape' && estadoVoz.falando) {
            pararFala();
        }
    });
}

function falarTexto(texto) {
    if (!texto || !('speechSynthesis' in window)) return;

    pararFala();

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Tenta encontrar uma voz em português
    const vozes = window.speechSynthesis.getVoices();
    const vozPortugues = vozes.find(function(v) {
        return v.lang.startsWith('pt');
    });
    if (vozPortugues) {
        utterance.voice = vozPortugues;
    }

    utterance.onstart = function() {
        estadoVoz.falando = true;
        const botao = document.getElementById('botaoOuvirPergunta');
        if (botao) {
            botao.classList.add('falando');
            botao.querySelector('.texto-voz').textContent = 'Parar leitura';
        }
    };

    utterance.onend = function() {
        estadoVoz.falando = false;
        const botao = document.getElementById('botaoOuvirPergunta');
        if (botao) {
            botao.classList.remove('falando');
            botao.querySelector('.texto-voz').textContent = 'Ouvir pergunta';
        }
    };

    utterance.onerror = function() {
        estadoVoz.falando = false;
        const botao = document.getElementById('botaoOuvirPergunta');
        if (botao) {
            botao.classList.remove('falando');
            botao.querySelector('.texto-voz').textContent = 'Ouvir pergunta';
        }
    };

    estadoVoz.utterance = utterance;
    window.speechSynthesis.speak(utterance);
}

function pararFala() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    estadoVoz.falando = false;
    const botao = document.getElementById('botaoOuvirPergunta');
    if (botao) {
        botao.classList.remove('falando');
        const textoVoz = botao.querySelector('.texto-voz');
        if (textoVoz) {
            textoVoz.textContent = 'Ouvir pergunta';
        }
    }
}

/* ============================================
   24. ESTATISTICAS PESSOAIS
   ============================================ */

function inicializarStatsPessoais() {
    const painel = document.getElementById('gridStatsPessoais');
    if (!painel) return;

    renderizarStatsPessoais();

    // Botão de resetar dados
    const botaoResetar = document.getElementById('botaoResetarStats');
    if (botaoResetar) {
        botaoResetar.addEventListener('click', function() {
            if (confirm('Tem certeza? Isso vai apagar todos os seus dados salvos (conquistas, pontuações, preferências). Esta ação não pode ser desfeita.')) {
                resetarTodosDados();
            }
        });
    }
}

function obterStatsPessoais() {
    function obterNum(chave, padrao) {
        const valor = localStorage.getItem(chave);
        return valor ? parseInt(valor, 10) : (padrao || 0);
    }

    function obterArray(chave) {
        try {
            const valor = localStorage.getItem(chave);
            return valor ? JSON.parse(valor) : [];
        } catch (e) {
            return [];
        }
    }

    const conquistas = obterArray('agrinho-conquistas');
    const paginasVisitadas = obterArray('agrinho-paginas-visitadas');
    const rankingJogo = obterArray('agrinho-ranking-jogo');
    const melhorJogo = obterNum('agrinho-melhor-pontuacao-jogo', 0);
    const melhorQuiz = obterNum('agrinho-melhor-pontuacao-quiz', 0);
    const totalJogos = obterNum('agrinho-total-jogos', 0);
    const totalQuiz = obterNum('agrinho-total-quiz', 0);
    const totalSimulador = obterNum('agrinho-total-simulador', 0);

    return {
        conquistas: conquistas.length,
        totalConquistas: 10,
        paginasVisitadas: paginasVisitadas.length,
        totalPaginas: 8,
        melhorJogo: melhorJogo,
        melhorQuiz: melhorQuiz,
        totalJogos: totalJogos,
        totalQuiz: totalQuiz,
        totalSimulador: totalSimulador,
        rankingJogo: rankingJogo
    };
}

function renderizarStatsPessoais() {
    const grid = document.getElementById('gridStatsPessoais');
    if (!grid) return;

    const stats = obterStatsPessoais();
    const percentualConquistas = Math.round((stats.conquistas / stats.totalConquistas) * 100);
    const percentualPaginas = Math.round((stats.paginasVisitadas / stats.totalPaginas) * 100);

    grid.innerHTML =
        '<div class="card-stat-pessoal destaque">' +
            '<div class="stat-icone">🏅</div>' +
            '<div class="stat-valor">' + stats.conquistas + '/' + stats.totalConquistas + '</div>' +
            '<div class="stat-rotulo">Conquistas</div>' +
            '<div class="barra-percentual"><div class="barra-percentual-preenchida" style="width:' + percentualConquistas + '%"></div></div>' +
        '</div>' +
        '<div class="card-stat-pessoal">' +
            '<div class="stat-icone">📖</div>' +
            '<div class="stat-valor">' + stats.paginasVisitadas + '/' + stats.totalPaginas + '</div>' +
            '<div class="stat-rotulo">Páginas visitadas</div>' +
            '<div class="barra-percentual"><div class="barra-percentual-preenchida" style="width:' + percentualPaginas + '%"></div></div>' +
        '</div>' +
        '<div class="card-stat-pessoal">' +
            '<div class="stat-icone">🎯</div>' +
            '<div class="stat-valor">' + stats.melhorQuiz + '</div>' +
            '<div class="stat-rotulo">Melhor Quiz</div>' +
        '</div>' +
        '<div class="card-stat-pessoal">' +
            '<div class="stat-icone">🛡️</div>' +
            '<div class="stat-valor">' + stats.melhorJogo + '</div>' +
            '<div class="stat-rotulo">Recorde Jogo</div>' +
        '</div>' +
        '<div class="card-stat-pessoal">' +
            '<div class="stat-icone">🧠</div>' +
            '<div class="stat-valor">' + stats.totalQuiz + '</div>' +
            '<div class="stat-rotulo">Quizzes feitos</div>' +
        '</div>' +
        '<div class="card-stat-pessoal">' +
            '<div class="stat-icone">🎮</div>' +
            '<div class="stat-valor">' + stats.totalJogos + '</div>' +
            '<div class="stat-rotulo">Partidas no jogo</div>' +
        '</div>' +
        '<div class="card-stat-pessoal">' +
            '<div class="stat-icone">🚜</div>' +
            '<div class="stat-valor">' + stats.totalSimulador + '</div>' +
            '<div class="stat-rotulo">Fazendas criadas</div>' +
        '</div>';
}

function incrementarContador(chave) {
    const atual = parseInt(localStorage.getItem(chave) || '0', 10);
    localStorage.setItem(chave, (atual + 1).toString());
}

function salvarMelhorPontuacao(chave, pontuacao) {
    const atual = parseInt(localStorage.getItem(chave) || '0', 10);
    if (pontuacao > atual) {
        localStorage.setItem(chave, pontuacao.toString());
    }
}

function resetarTodosDados() {
    const chaves = [
        'agrinho-tema',
        'agrinho-fonte',
        'agrinho-contraste',
        'agrinho-conquistas',
        'agrinho-paginas-visitadas',
        'agrinho-melhor-pontuacao-jogo',
        'agrinho-melhor-pontuacao-quiz',
        'agrinho-total-jogos',
        'agrinho-total-quiz',
        'agrinho-total-simulador',
        'agrinho-ranking-jogo',
        'agrinho-som-jogo'
    ];
    chaves.forEach(function(chave) {
        localStorage.removeItem(chave);
    });
    alert('Todos os dados foram resetados! Recarregue a página para começar do zero.');
    location.reload();
}

/* ============================================
   25. WEB SHARE API (BOTAO COMPARTILHAR)
   ============================================ */

function inicializarBotoesCompartilhar() {
    const botoes = document.querySelectorAll('.botao-compartilhar');

    botoes.forEach(function(botao) {
        botao.addEventListener('click', function() {
            const tipo = botao.dataset.tipo || 'site';
            compartilhar(tipo);
        });
    });
}

function compartilhar(tipo) {
    let texto = '';
    let titulo = '🌱 Agro Forte — Agrinho 2026';

    if (tipo === 'quiz') {
        const pontuacao = document.getElementById('resultadoPontuacao');
        const aproveitamento = document.getElementById('resumoAproveitamento');
        const p = pontuacao ? pontuacao.textContent : '';
        const a = aproveitamento ? aproveitamento.textContent : '';
        texto = '🧠 Acabei de fazer o quiz do Agrinho 2026 — Agro Forte!\n' +
                'Pontuação: ' + p + ' (' + a + ' de aproveitamento)\n\n' +
                'Tema: Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente.\n' +
                'Teste você também!';
    } else if (tipo === 'jogo') {
        const pontuacao = document.getElementById('pontuacaoFinalJogo');
        const p = pontuacao ? pontuacao.textContent : '0';
        texto = '🛡️ Fiz ' + p + ' pontos no jogo Defensor do Agro do Agrinho 2026!\n\n' +
                'Tema: Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente.\n' +
                'Joga você também!';
    } else if (tipo === 'simulador') {
        const nivel = document.getElementById('nivelFazenda');
        const n = nivel ? nivel.textContent : '';
        texto = '🚜 Construí uma "' + n + '" no simulador do Agrinho 2026!\n\n' +
                'Tema: Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente.';
    } else {
        texto = '🌱 Conheça o Agro Forte — projeto do Agrinho 2026!\n\n' +
                'Tema: Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente.\n' +
                'Site interativo com simulador de fazenda, quiz, mini-jogo, glossário e muito mais.';
    }

    const url = window.location.href.split('#')[0];

    // Tenta usar Web Share API (mobile/dispositivos modernos)
    if (navigator.share) {
        navigator.share({
            title: titulo,
            text: texto,
            url: url
        }).catch(function() {
            // Usuário cancelou ou erro — fallback para clipboard
            copiarParaClipboard(texto + '\n\n' + url);
        });
    } else {
        // Fallback: copia para clipboard
        copiarParaClipboard(texto + '\n\n' + url);
    }
}

function copiarParaClipboard(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(function() {
            mostrarToastCompartilhar('✓ Copiado para a área de transferência!');
        }).catch(function() {
            mostrarToastCompartilhar('Não foi possível copiar');
        });
    } else {
        // Fallback antigo
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            mostrarToastCompartilhar('✓ Copiado!');
        } catch (e) {
            mostrarToastCompartilhar('Não foi possível copiar');
        }
        document.body.removeChild(textarea);
    }
}

function mostrarToastCompartilhar(mensagem) {
    let toast = document.getElementById('toastCompartilhar');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastCompartilhar';
        toast.className = 'toast-compartilhar';
        document.body.appendChild(toast);
    }
    toast.textContent = mensagem;
    toast.classList.add('exibido');

    setTimeout(function() {
        toast.classList.remove('exibido');
    }, 2500);
}

/* ============================================
   25b. BARRA DE PROGRESSO DE LEITURA
   ============================================
   Mostra visualmente quanto da página o usuário
   já scrollou. Cria a barra dinamicamente para
   não precisar adicionar HTML em todas as páginas.
   ============================================ */

function inicializarBarraProgresso() {
    // Cria a barra dinamicamente e adiciona ao body
    const barra = document.createElement('div');
    barra.className = 'barra-progresso-leitura';
    barra.setAttribute('role', 'progressbar');
    barra.setAttribute('aria-label', 'Progresso de leitura da página');
    barra.setAttribute('aria-valuemin', '0');
    barra.setAttribute('aria-valuemax', '100');
    document.body.appendChild(barra);

    // Função que calcula e atualiza a porcentagem rolada
    function atualizarProgresso() {
        // Altura total scrollável = altura do documento - altura visível da janela
        const alturaScrollavel = document.documentElement.scrollHeight - window.innerHeight;
        // Posição atual do scroll (pixels rolados a partir do topo)
        const scrollAtual = window.scrollY || document.documentElement.scrollTop;
        // Porcentagem (0-100), evita divisão por zero em páginas curtas
        const porcentagem = alturaScrollavel > 0
            ? Math.min(100, Math.max(0, (scrollAtual / alturaScrollavel) * 100))
            : 0;

        barra.style.width = porcentagem + '%';
        barra.setAttribute('aria-valuenow', Math.round(porcentagem));
    }

    // Listener de scroll com passive: true para melhor performance
    window.addEventListener('scroll', atualizarProgresso, { passive: true });

    // Atualiza também ao redimensionar (mudança na altura da janela)
    window.addEventListener('resize', atualizarProgresso, { passive: true });

    // Estado inicial
    atualizarProgresso();
}

/* ============================================
   25c. TOUR GUIADO PARA PRIMEIRA VISITA
   ============================================
   Mostra um overlay com 5 passos destacando
   funcionalidades-chave do site. Exibido APENAS
   na primeira visita ao index.html. Persistido
   em localStorage para não repetir.
   ============================================ */

// Conteúdo dos passos do tour
const passosTour = [
    {
        icone: '🌱',
        titulo: 'Bem-vindo ao Agro Forte!',
        texto: 'Você está prestes a explorar um site interativo sobre <span class="destaque-tour">agronegócio sustentável</span>, criado para o Concurso Agrinho 2026.'
    },
    {
        icone: '🎮',
        titulo: 'Experimente as funcionalidades',
        texto: 'Use o <span class="destaque-tour">Simulador</span> para construir uma fazenda, o <span class="destaque-tour">Quiz</span> para testar conhecimentos ou o <span class="destaque-tour">Jogo</span> para se divertir defendendo o agro.'
    },
    {
        icone: '🏅',
        titulo: 'Desbloqueie conquistas',
        texto: 'Explore o site para desbloquear até <span class="destaque-tour">10 medalhas</span>! Acompanhe seu progresso no painel de conquistas da página inicial.'
    },
    {
        icone: '🌙',
        titulo: 'Personalize sua experiência',
        texto: 'Use o <span class="destaque-tour">tema escuro</span>, ajuste o <span class="destaque-tour">tamanho da fonte</span> ou ative o <span class="destaque-tour">alto contraste</span> pela barra lateral de acessibilidade.'
    },
    {
        icone: '⌨️',
        titulo: 'Atalhos úteis',
        texto: 'Pressione <span class="destaque-tour">Ctrl+K</span> para buscar, <span class="destaque-tour">T</span> para alternar tema, <span class="destaque-tour">ESC</span> para fechar modais. Tem até um easter egg escondido!'
    }
];

let passoAtualTour = 0;

function inicializarTourGuiado() {
    // Tour só roda no index.html
    const caminho = window.location.pathname;
    const ehIndex = caminho.endsWith('index.html') ||
                    caminho.endsWith('/') ||
                    caminho === '' ||
                    caminho.split('/').pop() === '';

    if (!ehIndex) {
        return;
    }

    // Verifica se o tour já foi visto antes (localStorage)
    const tourJaVisto = localStorage.getItem('agrinho-tour-completo');
    if (tourJaVisto === 'sim') {
        return;
    }

    // Aguarda a tela de carregamento sumir antes de mostrar o tour
    setTimeout(criarOverlayTour, 1800);
}

function criarOverlayTour() {
    // Cria o overlay dinamicamente
    const overlay = document.createElement('div');
    overlay.className = 'tour-overlay';
    overlay.id = 'tourOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Tour guiado para primeira visita');
    overlay.setAttribute('aria-modal', 'true');

    overlay.innerHTML = '<div class="tour-card">' +
        '<div class="tour-card-icone" id="tourIcone" aria-hidden="true"></div>' +
        '<h3 id="tourTitulo"></h3>' +
        '<p id="tourTexto"></p>' +
        '<div class="tour-passos" id="tourPassos" role="tablist"></div>' +
        '<div class="tour-botoes">' +
            '<button class="tour-botao-pular" id="tourBotaoPular" type="button">Pular tour</button>' +
            '<button class="tour-botao-proximo" id="tourBotaoProximo" type="button">Próximo →</button>' +
        '</div>' +
        '<p class="tour-contador" id="tourContador"></p>' +
    '</div>';

    document.body.appendChild(overlay);

    // Eventos dos botões
    document.getElementById('tourBotaoProximo').addEventListener('click', avancarTour);
    document.getElementById('tourBotaoPular').addEventListener('click', fecharTour);

    // ESC fecha o tour
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('ativo')) {
            fecharTour();
        }
    });

    // Inicia no primeiro passo
    passoAtualTour = 0;
    atualizarPassoTour();

    // Exibe o overlay
    overlay.classList.add('ativo');
}

function atualizarPassoTour() {
    const passo = passosTour[passoAtualTour];
    if (!passo) return;

    document.getElementById('tourIcone').textContent = passo.icone;
    document.getElementById('tourTitulo').textContent = passo.titulo;
    document.getElementById('tourTexto').innerHTML = passo.texto;
    document.getElementById('tourContador').textContent =
        'Passo ' + (passoAtualTour + 1) + ' de ' + passosTour.length;

    // Atualiza botão de próximo: muda texto no último passo
    const botaoProximo = document.getElementById('tourBotaoProximo');
    if (passoAtualTour === passosTour.length - 1) {
        botaoProximo.textContent = '🌱 Começar a explorar!';
    } else {
        botaoProximo.textContent = 'Próximo →';
    }

    // Renderiza os indicadores de passo (bolinhas)
    const containerPassos = document.getElementById('tourPassos');
    containerPassos.innerHTML = '';
    passosTour.forEach(function(_, indice) {
        const bolinha = document.createElement('span');
        bolinha.className = 'tour-passo';
        if (indice === passoAtualTour) {
            bolinha.classList.add('ativo');
        } else if (indice < passoAtualTour) {
            bolinha.classList.add('concluido');
        }
        bolinha.setAttribute('role', 'tab');
        bolinha.setAttribute('aria-label', 'Passo ' + (indice + 1));
        containerPassos.appendChild(bolinha);
    });
}

function avancarTour() {
    if (passoAtualTour < passosTour.length - 1) {
        passoAtualTour += 1;
        atualizarPassoTour();
    } else {
        // Último passo concluído → fecha tour
        fecharTour();
    }
}

function fecharTour() {
    const overlay = document.getElementById('tourOverlay');
    if (overlay) {
        overlay.classList.remove('ativo');
        // Remove do DOM após a transição
        setTimeout(function() {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 400);
    }

    // Marca o tour como concluído para não mostrar novamente
    localStorage.setItem('agrinho-tour-completo', 'sim');
}

/* ============================================
   26. REGISTRO DO SERVICE WORKER (PWA OFFLINE)
   ============================================ */

// Registra o Service Worker para permitir que o site
// funcione offline após a primeira visita.
// Service Worker é uma API web nativa (não é framework).
function inicializarServiceWorker() {
    // Verifica se o navegador suporta Service Workers
    if (!('serviceWorker' in navigator)) {
        return;
    }

    // Service Workers só funcionam em HTTPS ou localhost
    // (file:// não suporta - mas o site funciona normalmente)
    if (window.location.protocol === 'file:') {
        return;
    }

    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registro) {
                console.log('[Agro Forte] Service Worker registrado com sucesso. Escopo:', registro.scope);
            })
            .catch(function(erro) {
                console.log('[Agro Forte] Service Worker não pôde ser registrado:', erro);
            });
    });
}

/* ============================================
   27. INICIALIZACAO GERAL
   ============================================ */

// Aguarda o DOM estar pronto antes de iniciar tudo
document.addEventListener('DOMContentLoaded', function() {
    inicializarTelaCarregamento();
    inicializarTema();
    inicializarMenuMobile();
    inicializarAnimacoesScroll();
    inicializarContadores();
    inicializarBotaoTopo();
    inicializarAcessibilidade();
    inicializarBusca();
    inicializarQuiz();
    inicializarFormulario();
    inicializarCalculadora();
    inicializarFiltroPraticas();
    inicializarMapa();
    inicializarSimulador();
    inicializarGlossario();
    inicializarConquistas();
    inicializarCarrossel();
    inicializarComparador();
    inicializarJogo();
    inicializarParallax();
    inicializarAtalhosTeclado();
    inicializarKonami();
    inicializarSinteseVoz();
    inicializarStatsPessoais();
    inicializarBotoesCompartilhar();
    inicializarServiceWorker();
    inicializarBarraProgresso();
    inicializarTourGuiado();
    rastrearConquistasContextuais();

    // Mensagem de boas-vindas no console (apenas para desenvolvedores)
    console.log('%c🌱 Agro Forte - Agrinho 2026', 'color: #4f9d50; font-size: 20px; font-weight: bold;');
    console.log('%cTema: Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente', 'color: #1a4d2e; font-size: 12px;');
    console.log('%cAutor: João Gabriel Sabedra Vieira', 'color: #d4a017; font-size: 11px;');
});

// Exporta função de confete para uso externo (quiz)
window.dispararConfete = dispararConfete;
