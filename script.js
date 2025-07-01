document.addEventListener('DOMContentLoaded', function() {
    // 1. Menu Hambúrguer
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Listener para abrir/fechar o menu hambúrguer
    hamburgerBtn.addEventListener('click', function() {
        navMenu.classList.toggle('open');
        hamburgerBtn.classList.toggle('active');
    });

    // 2. Scroll Suave para Links de Navegação e Fechar Menu Hambúrguer
    // Seleciona todos os links que apontam para IDs na mesma página
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Fecha o menu hambúrguer, se estiver aberto
            navMenu.classList.remove('open');
            hamburgerBtn.classList.remove('active');

            const targetId = this.getAttribute('href'); // Ex: "#contato", "#consoles"

            // Se o link for para #contato (que agora abre o modal)
            if (targetId === '#contato') {
                e.preventDefault(); // Impede o scroll e o comportamento padrão
                openModal(); // Abre o modal de contato
            } else {
                // Para os outros links (Início, Consoles)
                e.preventDefault(); // Impede o comportamento padrão de "salto"
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Botão Scroll-to-Top
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // Mostra/esconde o botão de acordo com a posição da rolagem
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) { // Ajuste 200px conforme preferir
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Rola para o topo suavemente ao clicar no botão
    if (scrollToTopBtn) { // Garante que o botão existe
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Modal de Contato
    const contactModal = document.getElementById('contactModal');
    const openContactModalBtn = document.getElementById('openContactModal'); // Botão "Contato" no footer
    const closeButton = document.querySelector('.modal .close-button'); // Botão 'X' dentro do modal

    // Função para abrir o modal
    function openModal() {
        contactModal.classList.add('show');
    }

    // Função para fechar o modal
    function closeModal() {
        contactModal.classList.remove('show');
    }

    // Evento para abrir o modal pelo botão do footer
    if (openContactModalBtn) {
        openContactModalBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o link de ir a lugar nenhum
            openModal();
        });
    }

    // Evento para fechar o modal pelo botão 'X'
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Evento para fechar o modal clicando fora do conteúdo do modal
    if (contactModal) {
        window.addEventListener('click', function(event) {
            if (event.target == contactModal) { // Se o clique foi no overlay do modal
                closeModal();
            }
        });
    }

    // 5. Validação do Formulário de Contato
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão

            let isValid = true;

            // Validação do Nome
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Por favor, digite seu nome.';
                isValid = false;
            } else {
                nameError.textContent = '';
            }

            // Validação do Email
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Por favor, digite seu email.';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value)) {
                emailError.textContent = 'Por favor, digite um email válido.';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            // Validação da Mensagem
            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('message-error');
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Por favor, digite sua mensagem.';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) { // Mínimo de 10 caracteres
                messageError.textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
                isValid = false;
            } else {
                messageError.textContent = '';
            }

            // Se tudo estiver válido, simula o envio e fecha o modal
            if (isValid) {
                alert('Formulário enviado com sucesso! (Isso é apenas uma simulação)');
                contactForm.reset(); // Limpa os campos do formulário
                closeModal(); // Fecha o modal
            }
        });
    }

const fadeElements = document.querySelectorAll('.hidden-fade'); // Seleciona todos os elementos com a classe hidden-fade

    const observerOptions = {
        root: null, // O viewport (janela do navegador) é o root
        rootMargin: '0px', // Nenhuma margem extra
        threshold: 0.2 // O elemento é considerado "visível" quando 20% dele está no viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Se o elemento está entrando no viewport
                entry.target.classList.add('appear'); // Adiciona a classe 'appear'
                observer.unobserve(entry.target); // Deixa de observar o elemento (anima apenas uma vez)
            }
        });
    }, observerOptions);

    // Observa cada elemento que queremos animar
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
