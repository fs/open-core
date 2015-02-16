# Discourse Reports Plugin

A simple plugins restructs topics comments.

[![Code Climate](https://codeclimate.com/github/Continuous-Security/discourse_reports/badges/gpa.svg)](https://codeclimate.com/github/Continuous-Security/discourse_reports)

## Installation

- cd plugins
- git clone https://github.com/Continuous-Security/discourse_reports.git
- clone the repo here
- `bin/rake discourse_reports:install:migrations`
- `bin/rake db:migrate SCOPE=discourse_reports`

## Contributing

1. Fork it ( https://github.com/Continuous-Security/discourse_reports/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Testing

- Make sure you have installed `phantomjs`
- Run `bin/rspec` for rspec tests
- Run `bin/qunit` for qunit tests
