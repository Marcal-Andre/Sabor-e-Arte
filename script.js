document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. FUNCIONALIDADE DO CARDÁPIO (FILTROS) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe ativa de todos e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            menuItems.forEach(item => {
                // Efeito de transição suave
                item.style.opacity = '0';
                
                setTimeout(() => {
                    if (item.classList.contains(category)) {
                        item.style.display = 'flex';
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // --- 2. FORMULÁRIO DE ORÇAMENTO EM ETAPAS ---
    const form = document.querySelector('.budget-form');
    const fieldsets = form.querySelectorAll('fieldset');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Inicialização: Esconde todos os fieldsets exceto o primeiro
    fieldsets.forEach((fs, index) => {
        if (index !== 0) fs.style.display = 'none';
        
        // Adiciona botões "Seguir" dinamicamente (exceto no último)
        if (index < fieldsets.length - 1) {
            const nextBtn = document.createElement('button');
            nextBtn.type = 'button';
            nextBtn.innerText = 'Seguir para próxima etapa';
            nextBtn.className = 'btn btn-primary next-step';
            nextBtn.style.marginTop = '20px';
            fs.appendChild(nextBtn);

            nextBtn.addEventListener('click', () => {
                // Validação básica antes de seguir
                const inputs = fs.querySelectorAll('input, select');
                let valid = true;
                inputs.forEach(i => { if(i.hasAttribute('required') && !i.value) valid = false; });

                if(valid) {
                    fs.style.display = 'none';
                    fieldsets[index + 1].style.display = 'block';
                    fieldsets[index + 1].scrollIntoView({ behavior: 'smooth' });
                } else {
                    alert('Por favor, preencha os campos obrigatórios desta etapa.');
                }
            });
        }
    });

    // Esconde o botão de enviar original até chegar na última etapa
    submitBtn.style.display = 'none';
    const lastFieldset = fieldsets[fieldsets.length - 1];
    lastFieldset.appendChild(submitBtn); 
    
    // Observador para mostrar o botão enviar apenas na última etapa
    const observer = new MutationObserver(() => {
        if (lastFieldset.style.display === 'block') {
            submitBtn.style.display = 'inline-block';
        }
    });
    observer.observe(lastFieldset, { attributes: true, attributeFilter: ['style'] });


    // --- 3. CARROSSEL DE DEPOIMENTOS (DEDICAÇÃO E CUIDADO) ---
    const testimonials = [
        { name: "Mariana Silva", text: "O bolo do meu casamento foi um sonho! A dedicação da equipe em cada detalhe floral superou minhas expectativas. Sabor impecável!" },
        { name: "Ricardo Gomes", text: "Impressionado com o cuidado no transporte e montagem. Os salgados chegaram fresquinhos e a apresentação estava divina." },
        { name: "Ana Beatriz", text: "Minha confeitaria favorita em Fortaleza. Percebe-se o amor e o cuidado com os ingredientes em cada mordida das tortas gourmet." },
        { name: "Carla Souza", text: "Atendimento excepcional! Tivemos um pedido de última hora e eles trataram com total dedicação e profissionalismo. Recomendo!" }
    ];

    const carouselContainer = document.querySelector('.testimonial-carousel');
    const dots = document.querySelectorAll('.nav-dot');

    // Gera o HTML dos depoimentos
    carouselContainer.innerHTML = testimonials.map(t => `
        <div class="testimonial-item">
            <p>"${t.text}"</p>
            <strong>- ${t.name}</strong>
        </div>
    `).join('');

    function showTestimonial(index) {
        carouselContainer.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-play do carrossel a cada 5 segundos
    let currentTestimonial = 0;
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
});