// ===== COURSES PAGE JAVASCRIPT =====

// Course data structure
const coursesData = {
    "academia_vfa": {
        title: "Academia-VFA Formação Profissional",
        icon: "fas fa-graduation-cap",
        children: {
            "seguranca_higiene": {
                title: "Segurança, Higiene e Saúde no Trabalho",
                icon: "fas fa-shield-alt",
                children: {
                    "nivel_1": {
                        title: "Nível 1 - Fundamentos",
                        icon: "fas fa-certificate",
                        duration: "40 horas",
                        method: "Presencial/Online",
                        description: "Curso introdutório sobre os princípios básicos de segurança, higiene e saúde no trabalho."
                    },
                    "nivel_2": {
                        title: "Nível 2 - Intermediário",
                        icon: "fas fa-certificate",
                        duration: "60 horas",
                        method: "Presencial/Online",
                        description: "Aprofundamento em técnicas de prevenção e gestão de riscos ocupacionais."
                    },
                    "nivel_3": {
                        title: "Nível 3 - Avançado",
                        icon: "fas fa-certificate",
                        duration: "80 horas",
                        method: "Presencial",
                        description: "Curso avançado para formação de técnicos especializados em segurança do trabalho."
                    },
                    "nivel_4": {
                        title: "Nível 4 - Especialização",
                        icon: "fas fa-certificate",
                        duration: "100 horas",
                        method: "Presencial",
                        description: "Especialização em gestão integrada de segurança, higiene e saúde ocupacional."
                    },
                    "nivel_5": {
                        title: "Nível 5 - Supervisão",
                        icon: "fas fa-certificate",
                        duration: "120 horas",
                        method: "Presencial",
                        description: "Formação para supervisores e coordenadores de segurança do trabalho."
                    }
                }
            },
            "qualidade_ambiente": {
                title: "Qualidade, Higiene, Saúde e Ambiente",
                icon: "fas fa-leaf",
                children: {
                    "controlo_qualidade": {
                        title: "Controlo e Garantia de Qualidade",
                        icon: "fas fa-check-circle",
                        duration: "50 horas",
                        method: "Presencial/Online",
                        description: "Sistemas de gestão da qualidade e técnicas de controlo de processos."
                    },
                    "gestao_documental": {
                        title: "Gestão Documental",
                        icon: "fas fa-file-alt",
                        duration: "30 horas",
                        method: "Online",
                        description: "Organização e gestão de documentos em sistemas de qualidade."
                    },
                    "seguranca_alimentar": {
                        title: "Segurança Alimentar",
                        icon: "fas fa-utensils",
                        duration: "40 horas",
                        method: "Presencial",
                        description: "Princípios de HACCP e sistemas de segurança alimentar."
                    },
                    "saude_ocupacional": {
                        title: "Saúde Ocupacional",
                        icon: "fas fa-heartbeat",
                        duration: "60 horas",
                        method: "Presencial",
                        description: "Medicina do trabalho e prevenção de doenças ocupacionais."
                    }
                }
            },
            "sistemas_gestao": {
                title: "Sistemas de Gestão",
                icon: "fas fa-cogs",
                children: {
                    "iso_9001": {
                        title: "ISO 9001 - Gestão da Qualidade",
                        icon: "fas fa-award",
                        duration: "40 horas",
                        method: "Presencial/Online",
                        description: "Implementação e auditoria de sistemas de gestão da qualidade ISO 9001."
                    },
                    "iso_14001": {
                        title: "ISO 14001 - Gestão Ambiental",
                        icon: "fas fa-tree",
                        duration: "40 horas",
                        method: "Presencial/Online",
                        description: "Sistemas de gestão ambiental e sustentabilidade empresarial."
                    },
                    "iso_22000": {
                        title: "ISO 22000 - Segurança Alimentar",
                        icon: "fas fa-apple-alt",
                        duration: "40 horas",
                        method: "Presencial",
                        description: "Sistemas de gestão de segurança alimentar baseados na ISO 22000."
                    },
                    "iso_19011": {
                        title: "ISO 19011 - Auditorias",
                        icon: "fas fa-search",
                        duration: "32 horas",
                        method: "Presencial",
                        description: "Técnicas de auditoria para sistemas de gestão integrados."
                    }
                }
            }
        }
    },
    "engenharia": {
        title: "Gestão de Projectos de Engenharia",
        icon: "fas fa-tools",
        children: {
            "instrumentacao": {
                title: "Instrumentação Industrial",
                icon: "fas fa-microchip",
                children: {
                    "fundamentos": {
                        title: "Fundamentos de Instrumentação",
                        icon: "fas fa-wrench",
                        duration: "60 horas",
                        method: "Presencial",
                        description: "Princípios básicos de instrumentação e controlo industrial."
                    },
                    "calibracao": {
                        title: "Calibração e Manutenção",
                        icon: "fas fa-tools",
                        duration: "50 horas",
                        method: "Presencial",
                        description: "Técnicas de calibração e manutenção de instrumentos industriais."
                    }
                }
            },
            "automacao": {
                title: "Automação Industrial",
                icon: "fas fa-robot",
                children: {
                    "clp": {
                        title: "Controladores Lógicos Programáveis",
                        icon: "fas fa-microchip",
                        duration: "80 horas",
                        method: "Presencial",
                        description: "Programação e aplicação de CLPs em sistemas industriais."
                    },
                    "scada": {
                        title: "Sistemas SCADA/IHM",
                        icon: "fas fa-desktop",
                        duration: "60 horas",
                        method: "Presencial",
                        description: "Desenvolvimento de sistemas de supervisão e controlo."
                    },
                    "robotica": {
                        title: "Robótica Industrial",
                        icon: "fas fa-robot",
                        duration: "100 horas",
                        method: "Presencial",
                        description: "Programação e operação de sistemas robóticos industriais."
                    }
                }
            },
            "electronica": {
                title: "Electrónica e Controlo",
                icon: "fas fa-bolt",
                children: {
                    "electronica_basica": {
                        title: "Electrónica Básica",
                        icon: "fas fa-microchip",
                        duration: "50 horas",
                        method: "Presencial",
                        description: "Fundamentos de electrónica analógica e digital."
                    },
                    "controlo_processos": {
                        title: "Controlo de Processos",
                        icon: "fas fa-chart-line",
                        duration: "70 horas",
                        method: "Presencial",
                        description: "Sistemas de controlo em malha fechada para processos industriais."
                    }
                }
            }
        }
    },
    "gestao_organizacional": {
        title: "Gestão Organizacional",
        icon: "fas fa-building",
        children: {
            "linguas": {
                title: "Línguas e Comunicação",
                icon: "fas fa-comments",
                children: {
                    "ingles_profissional": {
                        title: "Inglês no Contexto Profissional",
                        icon: "fas fa-globe",
                        duration: "60 horas",
                        method: "Presencial/Online",
                        description: "Inglês técnico para ambiente profissional e industrial."
                    },
                    "expressao_oral": {
                        title: "Técnicas de Expressão Oral e Escrita",
                        icon: "fas fa-microphone",
                        duration: "40 horas",
                        method: "Presencial",
                        description: "Desenvolvimento de competências de comunicação empresarial."
                    }
                }
            },
            "informatica": {
                title: "Informática Aplicada",
                icon: "fas fa-laptop",
                children: {
                    "excel_avancado": {
                        title: "Excel Avançado",
                        icon: "fas fa-table",
                        duration: "30 horas",
                        method: "Presencial/Online",
                        description: "Funcionalidades avançadas do Excel para análise de dados."
                    },
                    "informatica_utilizador": {
                        title: "Informática na Óptica do Utilizador",
                        icon: "fas fa-computer",
                        duration: "40 horas",
                        method: "Online",
                        description: "Competências básicas de informática para utilizadores."
                    }
                }
            }
        }
    }
};

// Global variables
let currentCourse = null;
let searchResults = [];

// Initialize page
$(document).ready(function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Hide preloader
    setTimeout(() => {
        $('#preloader').fadeOut(500);
    }, 2000);

    // Build tree view
    buildTreeView();

    // Initialize search
    initializeSearch();

    // Handle navbar scroll
    handleNavbarScroll();
});

// Build tree view
function buildTreeView() {
    const treeContainer = $('#courseTree');
    treeContainer.empty();

    Object.keys(coursesData).forEach(categoryKey => {
        const category = coursesData[categoryKey];
        const categoryElement = createTreeNode(category, categoryKey, 'category');
        treeContainer.append(categoryElement);

        if (category.children) {
            const childrenContainer = $('<div class="tree-children" style="display: none;"></div>');
            buildTreeChildren(category.children, childrenContainer, categoryKey);
            categoryElement.append(childrenContainer);
        }
    });
}

// Build tree children
function buildTreeChildren(children, container, parentPath) {
    Object.keys(children).forEach(childKey => {
        const child = children[childKey];
        const childPath = `${parentPath}.${childKey}`;
        const childElement = createTreeNode(child, childPath, child.children ? 'subcategory' : 'course');
        container.append(childElement);

        if (child.children) {
            const grandChildrenContainer = $('<div class="tree-children" style="display: none;"></div>');
            buildTreeChildren(child.children, grandChildrenContainer, childPath);
            childElement.append(grandChildrenContainer);
        }
    });
}

// Create tree node
function createTreeNode(item, path, type) {
    const hasChildren = item.children && Object.keys(item.children).length > 0;
    const nodeClass = `tree-node ${type}`;
    
    const node = $(`
        <div class="tree-item">
            <div class="${nodeClass}" data-path="${path}" data-type="${type}">
                <i class="tree-icon ${item.icon}"></i>
                <span class="tree-text">${item.title}</span>
                ${hasChildren ? '<i class="expand-icon fas fa-chevron-right"></i>' : ''}
            </div>
        </div>
    `);

    // Add click handler
    node.find('.tree-node').click(function(e) {
        e.stopPropagation();
        
        if (hasChildren) {
            toggleTreeNode($(this));
        } else {
            selectCourse(path, item);
        }
    });

    return node;
}

// Toggle tree node
function toggleTreeNode(node) {
    const children = node.siblings('.tree-children');
    const expandIcon = node.find('.expand-icon');
    
    if (children.is(':visible')) {
        children.slideUp(300);
        expandIcon.removeClass('fa-chevron-down').addClass('fa-chevron-right');
        node.removeClass('expanded');
    } else {
        children.slideDown(300);
        expandIcon.removeClass('fa-chevron-right').addClass('fa-chevron-down');
        node.addClass('expanded');
    }
}

// Select course
function selectCourse(path, courseData) {
    // Remove active class from all nodes
    $('.tree-node').removeClass('active');
    
    // Add active class to selected node
    $(`.tree-node[data-path="${path}"]`).addClass('active');
    
    // Update course details
    updateCourseDetails(courseData, path);
    
    currentCourse = { path, data: courseData };
}

// Update course details
function updateCourseDetails(courseData, path) {
    const title = $('#courseTitle');
    const breadcrumb = $('#courseBreadcrumb');
    const content = $('#courseContent');
    
    // Update title
    title.text(courseData.title);
    
    // Update breadcrumb
    const pathParts = path.split('.');
    const breadcrumbText = pathParts.map(part => {
        return getItemByPath(part, coursesData)?.title || part;
    }).join(' > ');
    breadcrumb.text(breadcrumbText);
    
    // Update content
    if (courseData.duration) {
        // This is a course with details
        content.html(`
            <div class="course-detail">
                <div class="course-meta">
                    <div class="meta-card">
                        <div class="meta-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="meta-label">Carga Horária</div>
                        <div class="meta-value">${courseData.duration}</div>
                    </div>
                    <div class="meta-card">
                        <div class="meta-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div class="meta-label">Método de Estudo</div>
                        <div class="meta-value">${courseData.method}</div>
                    </div>
                    <div class="meta-card">
                        <div class="meta-icon">
                            <i class="fas fa-certificate"></i>
                        </div>
                        <div class="meta-label">Certificação</div>
                        <div class="meta-value">Certificado VFA-JORGE</div>
                    </div>
                </div>
                
                <div class="course-description">
                    <h4><i class="fas fa-info-circle me-2"></i>Descrição do Curso</h4>
                    <p>${courseData.description}</p>
                </div>
                
                <div class="course-actions">
                    <button class="btn btn-primary btn-lg me-3" onclick="enrollCourse()">
                        <i class="fas fa-user-plus me-2"></i>Inscrever-se
                    </button>
                    <button class="btn btn-outline-secondary btn-lg" onclick="downloadBrochure()">
                        <i class="fas fa-download me-2"></i>Baixar Brochura
                    </button>
                </div>
            </div>
        `);
    } else {
        // This is a category
        const childCount = courseData.children ? Object.keys(courseData.children).length : 0;
        content.html(`
            <div class="category-detail">
                <div class="category-icon">
                    <i class="${courseData.icon}"></i>
                </div>
                <h3>${courseData.title}</h3>
                <p>Esta categoria contém <strong>${childCount}</strong> ${childCount === 1 ? 'subcategoria' : 'subcategorias'} de cursos especializados.</p>
                <p>Explore as opções disponíveis na árvore ao lado para encontrar o curso ideal para suas necessidades profissionais.</p>
            </div>
        `);
    }
}

// Get item by path
function getItemByPath(path, data) {
    const parts = path.split('.');
    let current = data;
    
    for (const part of parts) {
        if (current[part]) {
            current = current[part];
        } else {
            return null;
        }
    }
    
    return current;
}

// Initialize search
function initializeSearch() {
    const searchInput = $('#courseSearch');
    
    searchInput.on('input', function() {
        const query = $(this).val().toLowerCase().trim();
        
        if (query.length >= 2) {
            performSearch(query);
        } else {
            clearSearch();
        }
    });
    
    searchInput.on('keypress', function(e) {
        if (e.which === 13) {
            searchCourses();
        }
    });
}

// Perform search
function performSearch(query) {
    searchResults = [];
    searchInData(coursesData, query, '');
    
    if (searchResults.length > 0) {
        highlightSearchResults();
    } else {
        clearSearch();
    }
}

// Search in data
function searchInData(data, query, currentPath) {
    Object.keys(data).forEach(key => {
        const item = data[key];
        const itemPath = currentPath ? `${currentPath}.${key}` : key;
        
        // Check if title matches
        if (item.title.toLowerCase().includes(query)) {
            searchResults.push({
                path: itemPath,
                item: item,
                type: item.duration ? 'course' : 'category'
            });
        }
        
        // Check if description matches (for courses)
        if (item.description && item.description.toLowerCase().includes(query)) {
            if (!searchResults.find(r => r.path === itemPath)) {
                searchResults.push({
                    path: itemPath,
                    item: item,
                    type: 'course'
                });
            }
        }
        
        // Search in children
        if (item.children) {
            searchInData(item.children, query, itemPath);
        }
    });
}

// Highlight search results
function highlightSearchResults() {
    // Remove previous highlights
    $('.tree-node').removeClass('search-highlight');
    
    // Add highlights to search results
    searchResults.forEach(result => {
        $(`.tree-node[data-path="${result.path}"]`).addClass('search-highlight');
        
        // Expand parent nodes to show the result
        expandToPath(result.path);
    });
}

// Expand to path
function expandToPath(path) {
    const parts = path.split('.');
    let currentPath = '';
    
    parts.forEach((part, index) => {
        if (index > 0) currentPath += '.';
        currentPath += part;
        
        const node = $(`.tree-node[data-path="${currentPath}"]`);
        const children = node.siblings('.tree-children');
        
        if (children.length > 0 && !children.is(':visible')) {
            children.show();
            node.find('.expand-icon').removeClass('fa-chevron-right').addClass('fa-chevron-down');
            node.addClass('expanded');
        }
    });
}

// Clear search
function clearSearch() {
    $('.tree-node').removeClass('search-highlight');
    searchResults = [];
}

// Search courses (button click)
function searchCourses() {
    const query = $('#courseSearch').val().toLowerCase().trim();
    
    if (query.length >= 2) {
        performSearch(query);
        
        if (searchResults.length > 0) {
            // Select first result
            const firstResult = searchResults[0];
            selectCourse(firstResult.path, firstResult.item);
            
            // Scroll to tree view on mobile
            if (window.innerWidth <= 768) {
                $('html, body').animate({
                    scrollTop: $('.tree-sidebar').offset().top - 100
                }, 500);
            }
        } else {
            alert('Nenhum curso encontrado para: ' + query);
        }
    } else {
        alert('Digite pelo menos 2 caracteres para pesquisar.');
    }
}

// Enroll course
function enrollCourse() {
    if (currentCourse) {
        alert(`Redirecionando para inscrição no curso: ${currentCourse.data.title}`);
        // Here you would redirect to enrollment page or open enrollment modal
    }
}

// Download brochure
function downloadBrochure() {
    if (currentCourse) {
        alert(`Baixando brochura do curso: ${currentCourse.data.title}`);
        // Here you would trigger download of course brochure
    }
}

// Handle navbar scroll
function handleNavbarScroll() {
    $(window).scroll(function() {
        const navbar = $('.navbar');
        
        if ($(window).scrollTop() > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });
}

// Add CSS for search highlight
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .tree-node.search-highlight {
            background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%) !important;
            border-color: #f39c12 !important;
            animation: searchPulse 2s infinite;
        }
        
        @keyframes searchPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        .course-actions {
            margin-top: 2rem;
            text-align: center;
        }
        
        .course-actions .btn {
            border-radius: 25px;
            padding: 0.75rem 2rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .course-actions .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .category-detail {
            text-align: center;
            padding: 2rem 0;
        }
        
        .category-icon {
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
        }
        
        .category-detail h3 {
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--dark-color);
        }
        
        .category-detail p {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 1rem;
        }
    `)
    .appendTo('head');

