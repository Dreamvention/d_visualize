<?php
class ControllerDVisualizeEvent extends Controller {
	public function header(&$view, &$data, &$output) {
		$this->load->config('d_visualize/header');
		$setting = $this->config->get('d_visualize_header');
		$output .= $this->load->controller($setting['route']);
	}

	public function footer(&$view, &$data, &$output) {
		$this->load->config('d_visualize/footer');
		$setting = $this->config->get('d_visualize_footer');
		$output .= $this->load->controller($setting['route']);
	}
}
