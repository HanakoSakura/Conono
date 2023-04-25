function Conono_InnerText(text) {
    // Type Judge
    if ((typeof text) != "string") {
        console.error("Conono FATAL ERROR : Error type:" + typeof text)
        return "Conono FATAL"
    }
    var cut_ret = ''
    var cut_tmp = ''
    var cut_val = 0
    var cut_buf = text
    var tmp = 0
    /* ------------------ Bold ------------------ */
    while (true) {
        // Judge
        cut_val = cut_buf.search(/\*{2}[^*]+\*{2}/)
        if (cut_val == -1) {
            cut_ret += cut_buf
            break
        }
        // Store [?]
        cut_ret += cut_buf.slice(0, cut_val)
        cut_buf = cut_buf.slice(cut_val, cut_buf.length)
        // Get
        cut_tmp = cut_buf.match(/\*{2}[^*]+\*{2}/)
        tmp = cut_tmp[0].length
        cut_tmp = cut_tmp[0].slice(2, -2)
        cut_ret += '<b>' + cut_tmp + '</b>'
        // Jump
        cut_buf = cut_buf.slice(tmp, cut_buf.length)
    }
    /* ------------------ Code ------------------ */
    cut_buf = cut_ret
    cut_ret = ''
    while (true) {
        // Judge
        cut_val = cut_buf.search(/`[^`]+`/)
        if (cut_val == -1) {
            cut_ret += cut_buf
            break
        }
        // Store [?]
        cut_ret += cut_buf.slice(0, cut_val)
        cut_buf = cut_buf.slice(cut_val, cut_buf.length)
        // Get
        cut_tmp = cut_buf.match(/`[^`]+`/)
        tmp = cut_tmp[0].length
        cut_tmp = cut_tmp[0].slice(1, -1)
        cut_ret += '<code style=\"color:#C00000\">' + cut_tmp + '</code>'
        // Jump
        cut_buf = cut_buf.slice(tmp, cut_buf.length)
    }
    cut_buf = cut_ret
    cut_ret = ''
    /* ------------------ Italic ------------------ */
    while (true) {
        // Judge
        cut_val = cut_buf.search(/\*{1}[^*]+\*{1}/)
        if (cut_val == -1) {
            cut_ret += cut_buf
            break
        }
        // Store [?]
        cut_ret += cut_buf.slice(0, cut_val)
        cut_buf = cut_buf.slice(cut_val, cut_buf.length)
        // Get
        cut_tmp = cut_buf.match(/\*{1}[^*]+\*{1}/)
        tmp = cut_tmp[0].length
        cut_tmp = cut_tmp[0].slice(1, -1)
        cut_ret += '<i>' + cut_tmp + '</i>'
        // Jump
        cut_buf = cut_buf.slice(tmp, cut_buf.length)
    }
    return cut_ret
}

function Conono(text) {
    // Type Judge
    if ((typeof text) != "string") {
        console.error("Conono FATAL ERROR : Error type:" + typeof text)
        return "Conono FATAL"
    }
    // Cutting
    var buffer = []
    buffer = text.split("\n")
    var TEXT = ''
    var SRH = ''
    var OFS = 0

    // Table
    var flag = ''
    var count = 0

    // Search
    var ret = ''
    var i = 0
    for (; i < buffer.length; i++) {
        TEXT = buffer[i]
        // Quote
        if (TEXT.search(/^> /) == 0) {
            if (flag != 'QUOTE') {
                ret += '<div class=\"Conono\" style=\"border-style: groove;border-width: 0px 0px 0px 5px;background-color: #E0E0E0;margin-left: inherit\">\n'
                flag = 'QUOTE'
            }
            ret += '<p>' + Conono_InnerText(TEXT.slice(2)) + '</p>\n'
            continue
        }
        if (flag == 'QUOTE') {
            flag = ''
            ret += '</div>'
        }
        // Line?
        if (TEXT.search(/^---\s*$/)!=-1) {
            ret += '<hr>\n'
            continue
        }
        // HEADING?
        if (TEXT.search(/^# /) == 0) {
            SRH = TEXT.slice(2)
            ret += '<h1 class=\"Conono\">' + Conono_InnerText(SRH) + '</h1>'
            continue
        }
        if (TEXT.search(/^## /) == 0) {
            SRH = TEXT.slice(3)
            ret += '<h2 class=\"Conono\">' + Conono_InnerText(SRH) + '</h2>'
            continue
        }
        if (TEXT.search(/^### /) == 0) {
            SRH = TEXT.slice(4)
            ret += '<h3 class=\"Conono\">' + Conono_InnerText(SRH) + '</h3>'
            continue
        }
        if (TEXT.search(/^#### /) == 0) {
            SRH = TEXT.slice(5)
            ret += '<h4 class=\"Conono\">' + Conono_InnerText(SRH) + '</h4>'
            continue
        }
        if (TEXT.search(/^##### /) == 0) {
            SRH = TEXT.slice(6)
            ret += '<h5 class=\"Conono\">' + Conono_InnerText(SRH) + '</h5>'
            continue
        }
        if (TEXT.search(/^###### /) == 0) {
            SRH = TEXT.slice(7)
            ret += '<h6 class=\"Conono\">' + Conono_InnerText(SRH) + '</h6>'
            continue
        }
        ret += '<p class=\"Conono\">' + Conono_InnerText(TEXT) + '</p>\n'
    }
    return ret
}