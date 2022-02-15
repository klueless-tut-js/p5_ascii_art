KManager.action :bootstrap do
  def on_action
    application_name = :p5_ascii_art

    director = KDirector::Dsls::BasicDsl
      .init(k_builder,
        on_exist:                   :skip,                      # %i[skip write compare]
        on_action:                  :queue                      # %i[queue execute]
      )
      .data(
        application:                application_name,
        application_description:    'Ascii Art using p5.js',
        author:                     'David Cruwys',
        author_email:               'david@ideasmen.com.au',
        initial_semver:             '1.0.0',
        main_story:                 '',
        copyright_date:             '2022'
      )
      .github(
        active: false,
        repo_name: application_name,
        organization: 'klueless-tut-js'
      ) do
        create_repository
        # delete_repository
        # list_repositories
        open_repository
        # run_command('git init')
      end
      .blueprint(
        active: false,
        name: :bin_hook,
        description: 'initialize repository',
        on_exist: :write) do

        cd(:app)

        run_command('git init')
        add('.gitignore')

        run_template_script('.git-setup.sh', dom: dom)

        run_command("git add .; git commit -m 'chore: #{self.options.description.downcase}'; git push")
        run_command("gh repo edit -d \"#{dom[:application_description]}\"")
      end
      .package_json(
        active: true,
        name: :package_json,
        description: 'Set up the package.json file for semantic versioning'
      ) do
        self
          .add('package.json', dom: dom)
          .play_actions

        self
          .sort
          .development
          .npm_install('p5')
          # .npm_add_group('xxx')
          # .add_script('xxx', 'xxx')

        # run_command("git add .; git commit -m 'chore: #{self.options.description.downcase}'; git push")
      end
      .blueprint(
        active: false,
        name: :opinionated,
        description: 'opinionated files',
        on_exist: :write) do

        cd(:app)

        # add('something.txt', dom: dom)

        # run_command("git add .; git commit -m 'chore: #{self.options.description.downcase}'; git push")
      end

    director.play_actions
  end
end

KManager.opts.app_name                    = 'p5-ascii-art'
KManager.opts.sleep                       = 2
KManager.opts.reboot_on_kill              = 0
KManager.opts.reboot_sleep                = 4
KManager.opts.exception_style             = :short
KManager.opts.show.time_taken             = true
KManager.opts.show.finished               = true
KManager.opts.show.finished_message       = 'FINISHED :)'
