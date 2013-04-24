# Require any additional compass plugins here.
require 'zurb-foundation'

# Root variables
relative_assets = true
http_path = "./"
css_dir = "/"
sass_dir = "/"
images_dir = "source/ui/basic/images/"
generated_images_dir = "source/ui/basic/images/sprites"
javascripts_dir = "source/ui/lib/"
additional_import_paths = Dir["source/ui/**/*","source/modules/**/*"]

# Switch to format compiled CSS (default = expanded)
# On production build use:
# 		compass compile -e production

if (environment == :production) 
	output_style = :compressed
	css_dir = "/ui/compressed/"
else
	output_style = :expanded
end
