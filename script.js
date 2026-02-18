
        // Configuração das datas para 2026
        const start = new Date(2026, 1, 18); // Fevereiro é 1
        const end = new Date(2026, 6, 15);   // Julho é 6

        const grid = document.getElementById('grid');
        const display = document.getElementById('days-left');

        let checkedDays = JSON.parse(localStorage.getItem('naty_countdown_2026')) || [];

        function init() {
            let current = new Date(start);
            grid.innerHTML = '';
            
            while (current <= end) {
                const time = current.getTime();
                const d = current.getDate();
                const m = current.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
                
                const box = document.createElement('div');
                box.className = 'day-unit' + (checkedDays.includes(time) ? ' checked' : '');
                box.innerHTML = `<span class="day-num">${d}</span><span class="month-name">${m}</span>`;

                box.onclick = () => {
                    if (checkedDays.includes(time)) {
                        checkedDays = checkedDays.filter(i => i !== time);
                        box.classList.remove('checked');
                    } else {
                        checkedDays.push(time);
                        box.classList.add('checked');
                    }
                    localStorage.setItem('naty_countdown_2026', JSON.stringify(checkedDays));
                    updateCounter();
                };

                grid.appendChild(box);
                current.setDate(current.getDate() + 1);
            }
            updateCounter();
        }

        function updateCounter() {
            const totalMs = end - start;
            const totalDays = Math.ceil(totalMs / (1000 * 60 * 60 * 24)) + 1;
            const left = totalDays - checkedDays.length;
            display.innerText = left > 0 ? left : 0;
        }

        init();