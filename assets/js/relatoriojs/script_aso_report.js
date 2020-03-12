function openPopup(obj) {
    let data = $(obj).serialize();
    if (data != '') {
        let url = BASE_URL + "/adminRelatorioGeral/relaso?" + data;
        window.open(url, "adminRelatorioGeral", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}