<?php
/*
*  location: admin/controller
*/

class ControllerExtensionModuleDVisualize extends Controller
{
    private $error = array();
    private $codename = 'd_visualize';
    private $route = 'extension/module/d_visualize';
    private $store_id = 0;

    public function __construct($registry)
    {

        parent::__construct($registry);
        $this->load->language($this->route);
        $this->load->model($this->route);
        $this->load->model('extension/'.$this->codename.'/template');
        $this->load->model('extension/' . $this->codename . '/extension_helper');
        $this->load->model('extension/d_opencart_patch/url');
        $this->load->model('extension/d_opencart_patch/load');
        $this->load->model('extension/d_opencart_patch/user');
        $this->load->model('tool/image');
        $this->d_shopunity = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_shopunity.json'));
        $this->d_admin_style = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_admin_style.json'));
        $this->d_opencart_patch = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_opencart_patch.json'));
        $this->extension = json_decode(file_get_contents(DIR_SYSTEM . 'library/d_shopunity/extension/' . $this->codename . '.json'), true);
        $this->d_twig_manager = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_twig_manager.json'));
        $this->d_event_manager = (file_exists(DIR_SYSTEM . 'library/d_shopunity/extension/d_event_manager.json'));

        $this->store_id = (isset($this->request->post['store_id'])) ? $this->request->post['store_id'] : 0;
        $setting_visualize = $this->model_extension_module_d_visualize->loadSetting();
        $this->setting_visualize = $setting_visualize['module_' . $this->codename . '_setting'];
        $this->status_visualize = isset($setting_visualize['module_' . $this->codename . '_status']) ? $setting_visualize['module_' . $this->codename . '_status'] : false;
        $this->model = 'model_extension_module_' . $this->codename;
        $this->model_template = 'model_extension_' . $this->codename . '_template';
        $this->model_helper = 'model_extension_' . $this->codename . '_extension_helper';

    }

    public function index()
    {

        $this->load->language($this->route);
        $this->document->setTitle($this->language->get('heading_title_main'));
        if ($this->d_shopunity) {
            $this->load->model('extension/d_shopunity/mbooth');
            $this->model_extension_d_shopunity_mbooth->validateDependencies($this->codename);
        }
        if ($this->d_event_manager) {
            $this->load->model('extension/module/d_event_manager');
            if (!$this->model_extension_module_d_event_manager->isCompatible()) {
                $this->model_extension_module_d_event_manager->installCompatibility();
            }
        }
        if ($this->d_twig_manager) {
            $this->load->model('extension/module/d_twig_manager');
            $this->model_extension_module_d_twig_manager->installCompatibility();
        }
//        $this->model_extension_d_visualize_template->uninstallTheme();
//        if ($this->status_visualize) {
//            $this->model_extension_d_visualize_template->installTheme($this->setting_visualize['active_template']);
//        }
        $this->session->data['d_visualize_page_admin']='home';
//        $this->model_extension_module_d_visualize->inc($this->visualize_version,intval(implode('', explode('.', $this->extension['version']))));
        if ($this->setting_visualize['engine'] == 'nuxt') {
            $nuxt_dist = 'view/javascript/d_visualize/dist';
            $data['app'] = file_get_contents($nuxt_dist . '/index.html');
            $data['app'] = str_replace('/_nuxt', HTTPS_SERVER . $nuxt_dist . '/_nuxt', $data['app']);
            $data['header'] = $this->load->controller('common/header');
            $data['column_left'] = $this->load->controller('common/column_left');
            $data['footer'] = $this->load->controller('common/footer');
            $this->response->setOutput($this->load->view($this->route . '_nuxt', $data));
        }
    }
    public function editor(){
        $this->session->data['d_visualize_page_admin']='editor';
        $nuxt_dist = 'view/javascript/d_visualize/dist';
        $nuxt_index = file_get_contents($nuxt_dist . '/index.html');
        //rewrite all links to base opencart url
        $data['app'] = str_replace('/_nuxt', HTTPS_SERVER . $nuxt_dist . '/_nuxt', $nuxt_index);
        $this->response->setOutput($this->load->view($this->route . '_nuxt_editor', $data));

    }
    /*
     * Deprecated was for twig engine
     * */
    public function setup($data)
    {
        $data['setup'] = true;
        $data['text_setup_title'] = $this->language->get('text_setup_title');
        $data['text_setup_description'] = $this->language->get('text_setup_description');
        $data['setup_bottom_image'] = $this->model_tool_image->resize('catalog/' . $this->codename . '/Image_footer_Social_Login.svg', 100, 100);
        $data['setup_into_logo'] = $this->model_tool_image->resize('catalog/' . $this->codename . '/social_login_preview.svg', 100, 100);

        $data['features'][] = array(
            'text' => $this->language->get('text_setup_step_by_step'),
            'icon' => $this->model_tool_image->resize('catalog/' . $this->codename . '/step_by_step.svg', 100, 100)
        );
        $data['features'][] = array(
            'text' => $this->language->get('text_setup_soc_logins'),
            'icon' => $this->model_tool_image->resize('catalog/' . $this->codename . '/soc_logins.svg', 100, 100)
        );
        $data['features'][] = array(
            'text' => $this->language->get('text_setup_full_customize'),
            'icon' => $this->model_tool_image->resize('catalog/' . $this->codename . '/full_customize.svg', 100, 100)
        );
        $data['features'][] = array(
            'text' => $this->language->get('text_setup_gdpr_compilant'),
            'icon' => $this->model_tool_image->resize('catalog/' . $this->codename . '/gdpr_compilant.svg', 100, 100)
        );
        $data['text_button_setup'] = $this->language->get('button_setup');
        $data['button_setup'] = $this->model_extension_d_opencart_patch_url->ajax($this->route . '/setupUrl');
        return $data;
    }
    /*
     * response for loading languages async via call from nuxt store
     * */
    public function load_language()
    {
        $this->response->setOutput(json_encode(array('locale' => $this->config->get('config_language_id'), 'messages' => $this->prepareLocal())));
    }
    /*
     * todo push it onto sub modules and give translations
     * load languages locals for i18n
     * */
    public function prepareLocal()
    {
        $local = array();

        $local['common']['heading_title'] = $this->language->get('heading_title_main');
        $local['common']['button_add'] = $this->language->get('button_add');
        $local['common']['button_save_and_stay'] = $this->language->get('button_save_and_stay');
        $local['common']['button_save'] = $this->language->get('button_save');
        $local['common']['button_cancel'] = $this->language->get('button_cancel');
        $local['common']['text_edit'] = $this->language->get('text_edit');
        $local['common']['text_yes'] = $this->language->get('text_yes');
        $local['common']['text_no'] = $this->language->get('text_no');
        $local['common']['preview'] = 'View your store';
        $local['common']['themes'] = 'Themes';
        $local['common']['setting'] = 'Setting';
        $local['common']['current_theme'] = 'Current theme';
        $local['common']['current_theme_description'] = 'This is the theme customers see when they visit your store.';
        $local['common']['change'] = 'Change';
        $local['common']['load_more'] = 'Show more';
        $local['common']['search'] = 'Search';
        $local['home']['download'] = 'Download';
        $local['home']['download_shopunity'] = 'Please download our module shopunity to get latest themes';
        $local['common']['vdh'] = $this->model_extension_d_opencart_patch_url->ajax('extension/module/d_visual_designer_header');
        $local['common']['vdf'] = $this->model_extension_d_opencart_patch_url->ajax('extension/module/d_visual_designer_footer');
        $local['common']['edit_panel'] = 'Edit Visualize settings';

        $local['setting']['entry_auto_save_help'] = $this->language->get('entry_auto_save_help');

        $local['dashboard']['entry_available_templates'] = $this->language->get('entry_available_templates');

        //dashboard
        $local['template']['live_demo'] = 'View Live Demo';
        $local['template']['replace_content'] = 'Replace existing content';
        $local['template']['use_this'] = 'Use This Template';
        $local['template']['customize'] = 'Customize';
        $local['template']['last_saved_on'] = 'Last saved on';
        $local['template']['entry_activate'] = $this->language->get('entry_activate');
        $local['template']['entry_deactivate'] = $this->language->get('entry_deactivate');
        $local['template']['actions'] = 'Actions';
        $local['template']['preview'] = 'Preview';
        $local['template']['rename'] = 'Rename';
        $local['template']['download'] = 'Download theme config';
        $local['template']['rename_form'] = 'Rename theme';
        $local['template']['rename_form_description'] = 'Provide a new name for this theme';
        $local['template']['available_templates'] = 'Available themes';
        $local['template']['available_templates_description'] = 'Manage your store\'s themes. Add and publish themes to change your online store\'s appearance.';
        $local['template']['explore'] = 'Explore';
        $local['template']['addition_images'] = 'Addition images';
        $local['template']['explore_more_themes'] = 'Explore more our themes';
        $local['template']['instalation_heading'] = 'Installation information';
        $local['template']['instalation_haeder'] = 'Replace current Visual Disgner Header';
        $local['template']['instalation_footer'] = 'Replace current Visual Disgner Footer';
        $local['template']['instalation_replace_catalog'] = 'Demo data for products and categories.';
        $local['template']['instalation_replace_extensions'] = 'Demo data for modules and extensions.';
        $local['template']['instalation_warn'] = 'Please be sure before you replace some content it can remove data you stored before.';
        $local['template']['instalation_hint'] = 'Leave this checkbox alone if you have stored data';
        $local['template']['instalation_cancel'] = 'Cancel';
        $local['template']['instalation_aprove'] = 'Approve';

        //common
        $local['editor']['current_template'] = $this->language->get('entry_current_template');
        $local['editor']['active_template'] = $this->language->get('entry_active_template');
        $local['editor']['change_template'] = $this->language->get('entry_change');
        $local['editor']['entry_component_skin'] = $this->language->get('entry_component_skin');
        $local['editor']['entry_custom_style'] = $this->language->get('entry_custom_style');
        $local['editor']['publish'] = $this->language->get('entry_publish');
        $local['editor']['header'] = 'Header';
        $local['editor']['footer'] = 'Footer';
        $local['editor']['custom'] = 'Custom section';
        $local['editor']['custom_help'] = 'Here you can edit your custom styles for current template skin';

        //header
        $local['editor']['section'] = 'Elements';
        $local['editor']['theme_set'] = 'Design';
        $local['editor']['common_components'] = 'Common';
        $local['editor']['current_page_components'] = 'Current page';

        //menu
        $local['editor']['vdh'] = 'Header';
        $local['editor']['vdf'] = 'Footer';
        $local['editor']['entry_skin'] = 'Skin';
        $local['editor']['entry_global'] = 'Global';
        $local['editor']['entry_colors'] = 'Colors';
        $local['editor']['entry_buttons'] = 'Buttons';
        $local['editor']['entry_font'] = 'Typography';
        $local['editor']['entry_forms'] = 'Forms & Inputs';
        $local['editor']['entry_layout'] = 'Layout';

        //skin page
        $local['editor']['entry_change_skin'] = 'You can change whole skin for your theme.';

        //can't use '/'
        $local['page']['common_home'] = 'Home page';
        $local['page']['product_product'] = 'Product page';
        $local['page']['product_category'] = 'Category page';
        $local['page']['checkout_cart'] = 'Cart page';
        $local['page']['checkout_checkout'] = 'Checkout page';
        $local['page']['account_all'] = 'Account/*';
        $local['page']['account_login'] = 'Login page';
        $local['page']['checkout_all'] = 'Checkout/*';
        $local['page']['all'] = 'Default page';
        $local['page']['default'] = 'Common page';
        $local['page']['information_contact'] = 'Contact/*';
        $local['page']['multiple'] = 'Multiple page will be applied';

        //component
        $local['component']['entry_d_product_thumb'] = $this->language->get('entry_d_product_thumb');
        $local['component']['entry_d_product_thumb_description'] = $this->language->get('entry_d_product_thumb_description');
        $local['component']['entry_d_product_sort'] = $this->language->get('entry_d_product_sort');
        $local['component']['entry_breadcrumb'] = $this->language->get('entry_breadcrumb');
        $local['component']['entry_form_group'] = 'Form group';
        $local['component']['entry_d_notification'] = 'Notification';
        $local['component']['entry_d_mini_cart'] = 'Mini cart';
        $local['component']['entry_product_product'] = $local['page']['product_product'];
        $local['component']['entry_product_category'] = $local['page']['product_category'];
        $local['component']['entry_checkout_cart'] = $local['page']['checkout_cart'];
        $local['component']['entry_checkout_checkout'] = $local['page']['checkout_checkout'];
        $local['component']['entry_information_contact'] = 'Contact us page';
        $local['component']['entry_common_components'] = $this->language->get('entry_common_components');

        $local['color']['text_primary'] = 'Primary-text color';
        $local['color']['primary'] = 'Primary color';
        $local['color']['text_secondary'] = 'Secondary-text color';
        $local['color']['secondary'] = 'Secondary color';
        $local['color']['text_default'] = 'Default-text color';
        $local['color']['default'] = 'Default color';
        $local['color']['text_menu'] = 'Menu-text color';
        $local['color']['menu'] = 'Menu';

        $local['color']['text_body'] = 'Text color';
        $local['color']['heading'] = 'Headings color';
        $local['color']['link'] = 'Link color';

        $local['font']['size_base'] = 'Text base size';
        $local['font']['line_height'] = 'Line height';
        $local['font']['family'] = 'Text font family';
        $local['font']['headings_family'] = 'Headings font family';
        $local['font']['headings_size_base'] = 'Headings base size';
        $local['font']['headings_line_height'] = 'Headings line height';
        $local['font']['headings_letter_spacing'] = 'Headings letter spacing';
        $local['font']['headings_text_transform'] = 'Headings text transform';
        $local['font']['not_found'] = 'No font found';
        $local['font']['bold'] = '<b>bold</b>';
        $local['font']['underline'] = '<span style="text-decoration: underline">underline</span>';
        $local['font']['italic'] = '<i>italic</i>';
        $local['font']['capitalize'] = 'Capitalize Headings';
        $local['font']['uppercase'] = 'UPPERCASE';


        $local['editor']['entry_button'] = 'Button';
        $local['button']['radius'] = 'Button radius';
        $local['button']['font_size'] = 'Button font-size';
        $local['button']['border_width'] = 'Button border-width';
        $local['button']['transform'] = 'Button text transformations';
        $local['button']['not_found'] = 'Not found property';
        $local['button']['shadow'] = 'Button shadow';
        $local['marketplace']['explore_all_themes'] = 'Explore all themes';


        $local['forms']['radius'] = 'Form radius';
        $local['forms']['font_size'] = 'Form font size';
        $local['forms']['shadow'] = 'Form focus box shadow';


        $local['marketplace']['free'] = 'Free';
        $local['marketplace']['testing'] = 'eTesting';
        $local['marketplac  e']['passed'] = 'Passed';
        $local['marketplace']['free'] = 'Free';

        $local['error']['load_content'] = $this->language->get('error_load_content');
        $local['error']['save_content'] = $this->language->get('error_save_content');
        return array($this->config->get('config_language_id') => $local);
    }

    /*
     * Deprecated was for twig engine
     * */
    public function prepareOptions()
    {
        $option = array();
        // Breadcrumbs
        $option['common']['breadcrumbs'] = array();
        $option['common']['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->model_extension_d_opencart_patch_url->ajax('common/home')
        );

        $option['common']['breadcrumbs'][] = array(
            'text' => $this->language->get('text_module'),
            'href' => $this->model_extension_d_opencart_patch_url->getExtensionAjax('module')
        );

        $option['common']['breadcrumbs'][] = array(
            'text' => $this->language->get('heading_title_main'),
            'href' => $this->model_extension_d_opencart_patch_url->ajax($this->route)
        );
        // Variable
        $option['common']['id'] = $this->codename;
        $option['common']['route'] = $this->route;
        $option['common']['store_id'] = $this->store_id;
        $option['common']['version'] = $this->extension['version'];
        $option['common']['token'] = $this->model_extension_d_opencart_patch_user->getUrlToken();
        $option['common']['d_shopunity'] = $this->d_shopunity;
        $option['common']['entry_get_update'] = sprintf($this->language->get('entry_get_update'), $this->extension['version']);
        // Multistore
        if (isset($this->request->get['store_id'])) {
            $store_id = $this->request->get['store_id'];
        } else {
            $store_id = 0;
        }
        // Url
        $url = '';
        if (isset($this->request->get['store_id'])) {
            $url .= '&store_id=' . $store_id;
        }

        $option['action']['cancel'] = $this->model_extension_d_opencart_patch_url->getExtensionAjax('module');
        $option['action']['module_link'] = $this->model_extension_d_opencart_patch_url->link($this->route);
        $option['action']['vdh'] = $this->model_extension_d_opencart_patch_url->ajax('extension/d_visual_designer/designer/frontend', 'config=d_visual_designer_header&id=0');
        $option['action']['vdf'] = $this->model_extension_d_opencart_patch_url->ajax('extension/d_visual_designer/designer/frontend', 'config=d_visual_designer_footer&id=0');
        $option['action']['action'] = $this->model_extension_d_opencart_patch_url->ajax($this->route, $url);
        $option['action']['cancel'] = $this->model_extension_d_opencart_patch_url->getExtensionAjax('module');
        $option['img']['no_image'] = $this->model_tool_image->resize("no_image.png", 300, 400);
        $option['img']['no_data_img'] = 'view/image/' . $this->codename . '/nodata.png';
        $option['img']['desktop_frame'] = 'view/image/' . $this->codename . '/desktop_frame.png';
        $option['img']['mobile_frame'] = 'view/image/' . $this->codename . '/mobile_frame.png';

        return $option;
    }

    /*
     * Opencart green button install,
     * also called from shopunity module after
     * module downloading
     *
     * Add permissions for access and modify;
     * install database tables;
     * visualize no need evens they are need when theme is on.
     * */
    public function install()
    {
        $this->load->model('user/user_group');
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'access', 'extension/'.$this->codename);
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'access', 'extension/'.$this->codename.'/opencart');
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'access', 'extension/'.$this->codename.'/setting');
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'access', 'extension/'.$this->codename.'/template');
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'access', 'extension/'.$this->codename.'/editor');
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'access', 'extension/'.$this->codename.'/market');

        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'modify', 'extension/'.$this->codename);
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'modify', 'extension/'.$this->codename.'/opencart');
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'modify', 'extension/'.$this->codename.'/setting');
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'modify', 'extension/'.$this->codename.'/template');
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'modify', 'extension/'.$this->codename.'/editor');
        $this->model_user_user_group->addPermission($this->model_extension_d_opencart_patch_user->getGroupId(), 'modify', 'extension/'.$this->codename.'/market');
        $this->model_extension_module_d_visualize->installDataBase();

    }

    public function uninstall()
    {
        $this->model_extension_d_visualize_template->uninstallTheme();
    }
}
