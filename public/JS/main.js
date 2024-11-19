$(document).ready(() => {
    const $jsContent = $('#js-content');
    const $phpContent = $('#php-content');

    const limpiarCampos = () => {
        $jsContent.val('');
        $phpContent.val('');
    };

    const jsToPhp = (codigoJs) => {
        let codigoPhp = codigoJs;
        // Convierte variables de JS a PHP
        codigoPhp = codigoPhp.replace(/\b(const|let|var)\b\s+(\w+)/g, '$$$2');
        // Convierte arreglos de JS a PHP
        codigoPhp = codigoPhp.replace(/\[(.*?)\]/g, 'array($1)');
        // Convierte clases de JS a PHP
        codigoPhp = codigoPhp.replace(/class\s+(\w+)/g, 'class $1');
        return `<?php\n${codigoPhp}\n?>`;
    };

    const phpToJs = (codigoPhp) => {
        let codigoJs = codigoPhp;
        // Remover etiquetas de PHP
        codigoJs = codigoJs.replace(/<\?php|\?>/g, '').trim();
        // Convierte variables de PHP a JS
        codigoJs = codigoJs.replace(/\$(\w+)/g, 'let $1');
        // Convierte arreglos de PHP a JS
        codigoJs = codigoJs.replace(/array\((.*?)\)/g, '[$1]');
        // Convierte clases de PHP a JS
        codigoJs = codigoJs.replace(/class\s+(\w+)/g, 'class $1');
        return codigoJs;
    };

    const convertirCodigo = () => {
        const codigoJs = $jsContent.val().trim();
        const codigoPhp = $phpContent.val().trim();

        if (codigoJs && !codigoJs.includes('<?php') && !$phpContent.val()) {
            $phpContent.val(jsToPhp(codigoJs));
        } else if (codigoPhp && codigoPhp.includes('<?php') && !$jsContent.val()) {
            $jsContent.val(phpToJs(codigoPhp));
        } else if (!codigoJs && !codigoPhp) {
            alert('Por favor, ingresa código en uno de los campos.');
        } else {
            alert('El código ya está en el formato adecuado o ambos campos tienen contenido.');
        }
    };

    const copiarTexto = (selector) => {
        const text = $(selector).val();
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => alert('Texto copiado al portapapeles.'))
                .catch(() => alert('Error al copiar el texto.'));
        } else {
            alert('No hay texto para copiar.');
        }
    };

    $('#btn-limpiar').on('click', limpiarCampos);
    $('#btn-generar').on('click', convertirCodigo);

    // Botones de copiar
    $('#btn-copiar-js').on('click', () => copiarTexto('#js-content'));
    $('#btn-copiar-php').on('click', () => copiarTexto('#php-content'));
});
