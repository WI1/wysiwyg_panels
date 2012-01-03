Drupal.wysiwyg_panels = {};

Drupal.wysiwyg_panels.submitAjaxForm = function() {
  if (Drupal.wysiwyg && Drupal.wysiwygDetach) {
    for (w in Drupal.wysiwyg.instances) {
      p = Drupal.wysiwyg.instances[w];
      if (p.editor != 'none') {
        e = $('#' + p.field);
        Drupal.wysiwygDetach(e[0], p);
      }
    }
  }
  else if (typeof(CKEDITOR) != 'undefined') {
    if (typeof(CKEDITOR.instances) != 'undefined' && typeof(CKEDITOR.instances['edit-body']) != 'undefined') {
      Drupal.ckeditorOff('edit-body');
      $('#edit-body').addClass("ckeditor-processed");
    }
  }
  else if (typeof(doFCKeditorSave) != 'undefined') {
    doFCKeditorSave();
  }
}

Drupal.behaviors.wysiwyg_panels = function(context) {
  if ($('#panels-edit-display-form', context).size()) { 
    $('#panels-edit-display-form #edit-body-wrapper, #panels-edit-display-form #switch_edit-body, #panels-edit-display-form .textarea-identifier').remove();
  }

  if ($(context).attr('id') != '') {
    $('form:not(.ctools-use-modal-processed)', context).submit(Drupal.wysiwyg_panels.submitAjaxForm);
    $('.close').bind('mouseup', Drupal.wysiwyg_panels.submitAjaxForm);
  }
}
